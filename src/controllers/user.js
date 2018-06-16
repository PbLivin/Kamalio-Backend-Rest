export async function getNotificationSettings(req, res) {
    const { user } = res.locals
    const { UserNotificationSettings } = req.app.get('models')

    const userNotificationSettings = await UserNotificationSettings.find({
        where: {
            userId: user.id
        }
    })

    res.json(userNotificationSettings)
}

export async function updateNotificationSettings(req, res) {
    const { user } = res.locals
    const { UserNotificationSettings } = req.app.get('models')
    const { allowNotifications } = req.body

    const userNotificationSettings = await UserNotificationSettings.find({
        where: {
            userId: user.id
        }
    })

    userNotificationSettings.allowNotifications = allowNotifications
    await userNotificationSettings.save()

    res.json(userNotificationSettings)
}

export async function getStatistics(req, res) {
    res.send('Not Implemented')
}

export async function getKarma(req, res) {
    // TODO(davlis): Refactor
    const { user } = res.locals
    const { Comment, CommentVote, Post, PostVote } = req.app.get('models')

    let karmaValue = 0

    const commentIds = await Comment.findAll({ where: { userId: user.id } })
        .map(comment => comment.id)
    const postIds = await Post.findAll({ where: { userId: user.id } })
        .map(post => post.id)

    const commentVotes = await CommentVote.findAll({ where: { commentId: commentIds } })
    const postVotes = await PostVote.findAll({ where: { postId: postIds } })

    for (let i = 0; i < commentVotes.length; ++i) {
        karmaValue += commentVotes[i].value
    }

    for (let i = 0; i < postVotes.length; ++i) {
        karmaValue += postVotes[i].value * 2
    }

    res.send({ value: karmaValue })
}
