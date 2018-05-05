import { Router } from 'express'
import { errorWrap } from '../utils'
import * as userController from '../controllers/user'

const router = Router();

router.post('/verify', errorWrap(userController.verify))
router.post('/refresh-token', errorWrap(userController.refreshToken))

export default router
