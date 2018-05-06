import { assertOrThrow } from '../utils'
import { getPostsInRange, addDistanceInformationToPosts } from '../services/postsInRange'

export async function readAll(req, res) {
    const { offset = 0, limit = 20, myVoteInclude = true } = req.query
    const { latitude, longitude, section } = req.query
    const { user } = res.locals

    const { Post, PostVote, PostLocation, User, Comment } = req.app.get('models')

    const posts = await getPostsInRange({ longitude, latitude }, section, { offset, limit })

    const rawPosts = posts.rows.map(p => p.toJSON())

    if (myVoteInclude) {
        const myVotes = await PostVote.findAll({
            where: {
                postId: rawPosts.map(p => p.id),
                userId: user.id
            }
        })

        rawPosts.map(rawPost => {
            const myVote = myVotes.filter(vote => vote.postId === rawPost.id)[0]
            rawPost.myVote = (myVote && myVote.value) ? myVote.value : 0
        })
    }

    const postsWithDistance = addDistanceInformationToPosts({ longitude, latitude }, rawPosts)

    res.json(Object.assign({ rows: postsWithDistance }, { offset, limit, count: posts.count.length }))
}

export async function readOne(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function create(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function update(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function remove(req, res) {
    res.send('NOT IMPLEMENTED')
}
