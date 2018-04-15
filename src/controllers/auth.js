import { assertOrThrow } from '../utils'

export async function login(req, res) {
    const config = res.app.get('config')
    const { User } = req.app.get('models')
    const { deviceId } = req.body
    
    const user = await User.find({
        where: {
            deviceId,
        },
    })

    assertOrThrow(user, Error, 'User not found')

    const token = user.issueAuthToken(config.salt, config.auth)

    res.send({ user, token })
}

export async function register(req, res) {
    const config = res.app.get('config')
    const { User } = req.app.get('models')
    const { deviceId } = req.body
    
    const user = await User.create({
        deviceId,
    })

    res.json({
        user,
        token: user.issueAuthToken(config.salt, config.auth),
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
