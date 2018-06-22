import { Router } from 'express'
import { errorWrap } from '../utils'
import validate from '../middleware/validate'
import schema from '../validators/user'
import * as userController from '../controllers/user'

const router = Router()

router.get('/notification', validate(schema.getNotificationSettings), errorWrap(userController.getNotificationSettings))
router.put('/notification', validate(schema.updateNotificationSettings), errorWrap(userController.updateNotificationSettings))
router.get('/statistics', validate(schema.getStatistics), errorWrap(userController.getStatistics))
router.get('/karma', validate(schema.getKarma), errorWrap(userController.getKarma))

export default router
