import geolib from 'geolib'
import Sequelize from 'sequelize'
import getDatabase from '../database'

const RANGES = {
    HERE: 500,
    VERY_CLOSE: 1000,
    CLOSE: 3000,
    FAR: 5000,
    VERY_FAR: 10000
}

export function getPost(id) {
    return postQueryExecutor({ latitude: null, longitude: null }, { id })
}

export function getPostsBySectionInRange(
    section, { latitude, longitude }, { offset = 0, limit = 20 }
) {
    return postQueryExecutor({ latitude, longitude }, { section }, { offset, limit }) 
}

export async function postQueryExecutor(
    { latitude, longitude }, { id, section }, { offset, limit } = {}
) {
    const { sequelize } = getDatabase()
    const { PostLocation, Post, PostVote, Comment, User } = getDatabase().models

    let method
    let order

    const where = {}

    if (id) {
        method = 'findOne'
        order = null
        Object.assign(where, { id })
    }

    if (section) {
        method = 'findAndCountAll'
        if (section === 'BEST') {
            order = sequelize.literal('rating DESC')
        } else if (section === 'LOUDEST') {
            order = sequelize.literal('commentCount DESC')
        } else {
            order = sequelize.literal('"updatedAt" DESC')
        }
    }

    let postLocationWhere = {}
    if (latitude && longitude) {
        postLocationWhere = buildGeoQuery({ latitude, longitude, distance: RANGES.VERY_FAR })
    }

    const posts = await Post[method]({
        attributes: [
            [
                sequelize.fn('coalesce',
                    sequelize.cast(
                        sequelize.fn('sum', sequelize.col('PostVotes.value')), 'INTEGER'
                    ),
                    0
                ),
                'rating'
            ],
            [
                sequelize.fn('coalesce',
                    sequelize.cast(
                        sequelize.fn('count', sequelize.col('Comments.id')), 'INTEGER'
                    ),
                    0
                ),
                'commentCount'
            ],
            'title',
            'content',
            'photoUrl',
            'createdAt',
            'updatedAt',
            'userId',
            'id'
        ],
        where,
        include: [{
            model: PostVote,
            duplicating: false,
            attributes: [],
        }, {
            model: Comment,
            duplicating: false,
            attributes: [],
        }, {
            model: PostLocation,
            duplicating: false,
            where: postLocationWhere
        }],
        distinct: true,
        offset,
        limit,
        order,
        group: ['Post.id', 'PostLocation.id'],
    })

    return posts
}

export function addDistanceInformationToPosts({ latitude, longitude }, posts) {
    for (let i = 0; i < posts.length; ++i) {
        const { PostLocation: postLocation } = posts[i]
        const pLat = postLocation.latitude
        const pLon = postLocation.longitude

        const distance = geolib.getDistance(
            { latitude: pLat, longitude: pLon },
            { latitude, longitude }
        )

        const distanceLabels = Object.keys(RANGES)
        for (let j = 0; j < distanceLabels.length; ++j) {
            const distanceLabel = distanceLabels[j]
            if (distance < RANGES[distanceLabel]) {
                postLocation.distance = distanceLabel
                break;
            }
        }
    }

    return posts
}

export function buildGeoQuery({ latitude, longitude, distance }) {
    const { minLat, maxLat, minLon, maxLon } = getBoundaries(latitude, longitude, distance)
    const { Op } = Sequelize

    return Object.assign({}, {
        latitude: {
            [Op.gt]: minLat,
            [Op.lt]: maxLat
        },
        longitude: {
            [Op.gt]: minLon,
            [Op.lt]: maxLon
        }
    })
}

export function getBoundaries(lat, lon, dist) {
    const initialPoint = { lat, lon }

    const bears = [90, 180, 270, 360]

    let minLat = Number.MAX_VALUE
    let maxLat = -Number.MAX_VALUE
    let minLon = Number.MAX_VALUE
    let maxLon = -Number.MAX_VALUE

    bears.forEach((bearing) => {
        const { latitude, longitude } = geolib.computeDestinationPoint(initialPoint, dist, bearing)
        minLat = Math.min(minLat, latitude)
        maxLat = Math.max(maxLat, latitude)
        minLon = Math.min(minLon, longitude)
        maxLon = Math.max(maxLon, longitude)
    })

    return { minLat, maxLat, minLon, maxLon }
}
