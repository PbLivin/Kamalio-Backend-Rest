import { assertOrThrow } from '../utils'

export async function create(req, res) {
    const { content, postId } = req.body
    const { user } = res.locals
    const { Post, Comment } = req.app.get('models')

    const post = await Post.findOne({ where: { id: postId } })
    assertOrThrow(post, Error, 'Post not found')


    const comment = await Comment.create({
        content,
        postId,
        userId: user.id
    })

    res.send(comment)
}

export async function list(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function one(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function update(req, res) {
    res.send('NOT IMPLEMENTED')
}

export async function remove(req, res) {
    res.send('NOT IMPLEMENTED')
}
