import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import postRoutes from './routes/post'
import commentRoutes from './routes/comment'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', Authenticate, userRoutes)
router.use('/posts', Authenticate, postRoutes)
router.use('/comments', Authenticate, commentRoutes)

export default router
