import Joi from 'joi';
import { JWT_REGEX } from '../utils'

export default {
    verify: {
        body: {
            deviceId: Joi.string().required(),
            platform: Joi.string().required().valid('android', 'ios')
        }
    },
    refreshToken: {
        body: {
            refreshToken: Joi.string().regex(JWT_REGEX).required()
        }
    }
}
