import Joi from 'joi';

export default {
    list: {
        query: {
            offset: Joi.number().default(0).min(0),
            limit: Joi.number().default(20).min(0),
            myVoteInclude: Joi.boolean().default(true),
            queryTime: Joi.string().isoDate(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            section: Joi.string().valid('BEST', 'LATEST', 'LOUDEST').default('BEST')
        },
        body: {}
    },
    one: {
        params: {
            id: Joi.string().uuid().required()
        }
    },
    create: {
        body: {
            title: Joi.string().required(),
            content: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }
    },
    update: {
        body: {
            title: Joi.string().required(),
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
    putPostPhoto: {
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
