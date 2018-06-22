import Joi from 'joi';

export default {
    getNotificationSettings: {

    },
    updateNotificationSettings: {
        body: {
            allowNotifications: Joi.boolean().required(),
        }
    },
    getStatistics: {

    },
    getKarma: {

    }
}
