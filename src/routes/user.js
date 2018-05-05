import { Router } from 'express'
import { errorWrap } from '../utils'
import * as userController from '../controllers/user'

const router = Router();

router.get('/notification', errorWrap(userController.getNotificationSettings))
router.put('/notification', errorWrap(userController.updateNotificationSettings))
router.get('/statistics', errorWrap(userController.getStatistics))
router.get('/karma', errorWrap(userController.getKarma))

export default router
