import Sequelize from 'sequelize'
import defineUser from './models/user'
import defineUserUpload from './models/user-upload'
import defineUserNotificationSettings from './models/user-notification-settings'
import defineNotification from './models/notification'
import defineKarma from './models/karma'
import definePost from './models/post'
import definePostLocation from './models/post-location'
import defineComment from './models/comment'
import defineCommentVote from './models/comment-vote'
import definePostVote from './models/post-vote'

export default function initSequelizeFromConfig(config) {
    const sequelize = new Sequelize(config.postgres.uri, {
        dialect: 'postgres',
    })

    const models = {
        User: defineUser(sequelize),
        UserUpload: defineUserUpload(sequelize),
        UserNotificationSettings: defineUserNotificationSettings(sequelize),
        Notification: defineNotification(sequelize),
        Karma: defineKarma(sequelize),
        Post: definePost(sequelize),
        PostLocation: definePostLocation(sequelize),
        Comment: defineComment(sequelize),
        CommentVote: defineCommentVote(sequelize),
        PostVote: definePostVote(sequelize),
    }

    Object.keys(models).forEach((name) => {
        if ('associate' in models[name]) {
            models[name].associate(models)
        }
    })

    return { sequelize, models }
}
