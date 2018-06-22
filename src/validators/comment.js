import Joi from 'joi';

export default {
    create: {
        body: {
            content: Joi.string().required(),
            postId: Joi.string().uuid().required()
        }
    },
    list: {
        query: {
            offset: Joi.number().default(0).min(0),
            limit: Joi.number().default(20).min(0),
            postId: Joi.string().uuid().required(),
        },
    },
    one: {
        params: {
            id: Joi.string().uuid().required()
        }
    },
    update: {
        body: {
            content: Joi.string().required()
        },
        params: {
            id: Joi.string().uuid().required()
        }
    },
    remove: {
        params: {
            id: Joi.string().uuid().required()
        }
    },
    vote: {
        body: {
            value: Joi.number().valid(-1, 0, 1)
        },
        params: {
            id: Joi.string().uuid().required()
        }
    }
}
