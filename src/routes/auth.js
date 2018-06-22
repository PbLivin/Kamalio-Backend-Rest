import { Router } from 'express'
import { errorWrap } from '../utils'
import validate from '../middleware/validate'
import schema from '../validators/auth'
import * as authController from '../controllers/auth'

const router = Router()

router.post('/verify', validate(schema.verify), errorWrap(authController.verify))
router.post('/refresh-token', validate(schema.refreshToken), errorWrap(authController.refreshToken))

export default router
