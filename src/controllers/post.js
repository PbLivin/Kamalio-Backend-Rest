import { assertOrThrow } from '../utils'
import { getPostsBySectionInRange, getPostInRange, addDistanceInformationToPosts } from '../services/postsInRange'

export async function readAll(req, res) {
    const { offset = 0, limit = 20, myVoteInclude = true } = req.query
    const { latitude, longitude, section } = req.query
    const { user } = res.locals

    const posts = await getPostsBySectionInRange(
        section, { longitude, latitude }, { offset, limit }
    )

    const rawPosts = posts.rows.map(p => p.toJSON())

    if (myVoteInclude) {
        const { PostVote } = req.app.get('models')
        const myVotes = await PostVote.findAll({
            where: {
                postId: rawPosts.map(p => p.id),
                userId: user.id
            }
        })

        rawPosts.map((rawPost) => {
            const myVote = myVotes.filter(vote => vote.postId === rawPost.id)[0]
            rawPost.myVote = (myVote && myVote.value) ? myVote.value : 0
        })
    }

    const postsWithDistance = addDistanceInformationToPosts({ longitude, latitude }, rawPosts)

    res.json(Object.assign({ rows: postsWithDistance }, { offset, limit, count: posts.count.length }))
}

export async function readOne(req, res) {
    // TODO: Fetch latitude, longtitude from ip api or get it from user - to discuss
    const { latitude, longitude } = req.query
    const { id } = req.params

    const post = await getPostInRange(id, { latitude, longitude })
    assertOrThrow(post, Error, 'Post not found')
    
    res.json(post)
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
