import { assertOrThrow } from '../utils'
import getDatabase from '../database'

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

    res.json(comment)
}

export async function list(req, res) {
    // TODO(davlis): Add comments vote count
    const { sequelize } = getDatabase()
    const { user } = res.locals
    const { postId } = req.query
    const { offset, limit } = req.query
    const { Comment, CommentVote } = req.app.get('models')
    const order = sequelize.literal('"createdAt" ASC')

    const where = {}

    if (postId) {
        Object.assign(where, { postId })
    }

    const comments = await Comment.findAndCountAll({ where, offset, limit, order })

    const rawComments = comments.rows.map(p => p.toJSON())

    const myVotes = await CommentVote.findAll({
        where: {
            commentId: rawComments.map(p => p.id),
            userId: user.id
        }
    })

    rawComments.map((rawComment) => {
        const myVote = myVotes.filter(vote => vote.commentId === rawComment.id)[0]
        rawComment.myVote = (myVote && myVote.value) ? myVote.value : 0
    })


    res.json(Object.assign({ rows: rawComments }, { offset: Number(offset), limit: Number(limit) }))
}

export async function one(req, res) {
    const { id } = req.params
    const { Comment } = req.app.get('models')

    const comment = await Comment.findOne({ where: { id } })
    assertOrThrow(comment, Error, 'Comment not found')

    res.json(comment)
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
    res.json(comment)
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
