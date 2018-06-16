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
    const { id } = req.params
    const { Comment } = req.app.get('models')

    const comment = await Comment.findOne({ where: { id } })
    assertOrThrow(comment, Error, 'Comment not found')

    res.send(comment)
}

export async function update(req, res) {
    const { id } = req.params
    const { content } = req.body
    const { Comment } = req.app.get('models')
    const { user } = res.locals

    const comment = await Comment.findOne({ where: { id } })
    assertOrThrow(comment, Error, 'Post not found')

    assertOrThrow(comment.userId === user.id, Error, 'Insufficient rights')

    await comment.update({
        content
    })
    res.send(comment)
}

export async function remove(req, res) {
    res.send('NOT IMPLEMENTED')
}
