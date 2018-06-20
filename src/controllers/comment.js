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
    // TODO(davlis): Add comments vote count
    const { postId } = req.query
    const { offset = 0, limit = 20 } = req.query
    const { Comment } = req.app.get('models')
    const order = sequelize.literal('"createdAt" ASC')

    const where = {}

    if (postId) {
        Object.assign(where, { postId })
    }

    const comments = await Comment.findAndCountAll({ where, offset, limit, order })

    res.send(Object.assign(comments, { offset, limit }))
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
    assertOrThrow(comment, Error, 'Comment not found')

    assertOrThrow(comment.userId === user.id, Error, 'Insufficient rights')

    await comment.update({
        content
    })
    res.send(comment)
}

export async function remove(req, res) {
    const { id } = req.params
    const { user } = res.locals
    const { Comment } = req.app.get('models')

    const comment = await Comment.findOne({ where: { id } })
    assertOrThrow(comment, Error, 'Comment not found')

    assertOrThrow(comment.userId === user.id, Error, 'Insufficient rights')

    await comment.destroy()

    res.json({ status: 'ok' })
}

export async function vote(req, res) {
    // TODO(davlis): Move to external service
    const { Comment, CommentVote } = req.app.get('models')
    const { id } = req.params
    const { user } = res.locals

    const { value } = req.body

    const comment = await Comment.findOne({ where: { id } })
    assertOrThrow(comment, Error, 'Comment not found')

    const oldCommentVote = await CommentVote.findOne({ where: { userId: user.id, commentId: comment.id } })
    if (oldCommentVote) {
        await oldCommentVote.destroy()
    }

    const commentVote = await CommentVote.create({
        value,
        userId: user.id,
        commentId: comment.id
    })

    res.json(commentVote)
}
