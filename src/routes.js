import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import userRoutes from './routes/user'
import postRoutes from './routes/post'

const router = Router();

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)
router.use('/user', Authenticate, userRoutes)
router.use('/post', Authenticate, postRoutes)

export default router
