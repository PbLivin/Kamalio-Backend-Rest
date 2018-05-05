import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import notificationRoutes from './routes/notification'

const router = Router();

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)
router.use('/notification', Authenticate, notificationRoutes)

export default router
