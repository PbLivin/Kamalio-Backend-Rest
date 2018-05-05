import { assertOrThrow } from '../utils'

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
    res.send('Not Implemented')
}
