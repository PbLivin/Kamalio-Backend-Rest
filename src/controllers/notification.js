import { assertOrThrow } from '../utils'

export async function read(req, res) {
    const { user } = res.locals
    const { UserNotificationSettings } = req.app.get('models')

    const userNotificationSettings = await UserNotificationSettings.find({
        where: {
            userId: user.id
        }
    })

    res.json(userNotificationSettings)
}

export async function update(req, res) {
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
