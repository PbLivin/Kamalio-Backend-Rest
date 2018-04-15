import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'

const router = Router();

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)

export default router
