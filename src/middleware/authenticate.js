import jwt from 'jsonwebtoken'
import { assertOrThrow } from '../utils'

export default function authenticate(req, res, next) {

    wrap().catch(err => next(err))

    async function wrap() {
        const config = res.app.get('config')
        const { User } = req.app.get('models')
        const { authorization } = req.headers

        let user

        assertOrThrow(authorization, Error, 'Authorization header is missing')

        if (authorization.includes('Bearer ')) {
            const token = authorization.replace('Bearer ', '')
            try {
                let payload = jwt.verify(token, config.salt)
                user = await User.findById(payload.id)
            } catch (err) {
                throw new Error('Invalid Bearer Token')
            }
        } else {
            throw new Error('Invalid format of Authorization header')
        }

        assertOrThrow(user, Error, 'User not found')

        res.locals.user = user
        next()
    }
}
