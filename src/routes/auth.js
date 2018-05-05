import { Router } from 'express'
import { errorWrap } from '../utils'
import * as authController from '../controllers/auth'

const router = Router();

router.post('/verify', errorWrap(authController.verify))
router.post('/refresh-token', errorWrap(authController.refreshToken))

export default router
