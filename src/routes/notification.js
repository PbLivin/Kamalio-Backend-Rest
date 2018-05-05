import { Router } from 'express'
import { errorWrap } from '../utils'
import * as notificationController from '../controllers/notification'

const router = Router();

router.get('/', errorWrap(notificationController.read))
router.put('/', errorWrap(notificationController.update))

export default router
