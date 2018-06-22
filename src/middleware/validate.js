import Joi from 'joi';
import { badRequest } from 'boom';

export default (schema) => {
    return (req, res, next) => {
        if (schema.params) {
            const validation = Joi.validate(req.params, schema.params, { abortEarly: false, stripUnknown: true })
            if (validation.error) {
                throw badRequest('Validation Error', validation.error.details[0].message)
            }
        }

        if (schema.query) {
            const validation = Joi.validate(req.query, schema.query, { abortEarly: false, stripUnknown: true })
            if (validation.error) {
                throw badRequest('Validation Error', validation.error.details[0].message)
            }
            req.query = validation.value
        }

        if (schema.body) {
            const validation = Joi.validate(req.body, schema.body, { abortEarly: false, stripUnknown: true });
            if (validation.error) {
                throw badRequest('Validation Error', validation.error.details[0].message)
            }
            req.body = validation.value
        }

        next()
    }
}
