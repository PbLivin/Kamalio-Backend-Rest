import { assertOrThrow } from '../utils'

export async function verify(req, res) {
    const config = res.app.get('config')
    const { User, Karma, UserNotificationSettings } = req.app.get('models')
    const { deviceId, platform } = req.body

    const { user, isNew } = await User.findOrCreate(deviceId, platform)

    if (isNew) {
        await Karma.create({ userId: user.id })
        await UserNotificationSettings.create({ userId: user.id })
    }

    res.send({
        user,
        token: user.issueAuthToken(config.salt, config.auth)
    })
}

export async function refreshToken(req, res) {
    const { salt, auth: authConfig } = req.app.get('config')
    const { User } = req.app.get('models')
    const { refreshToken } = req.body

    let payload
    try {
        payload = jwt.verify(refreshToken, salt)
    } catch (err) {
        console.log(err)
    }

    const user = await User.findById(payload.id)

    assertOrThrow(user, Error, 'User not found')

    res.json(user.issueAuthToken(salt, authConfig))
}
