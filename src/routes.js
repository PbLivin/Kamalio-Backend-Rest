import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import userRoutes from './routes/user'
import homeRoutes from './routes/home'

const router = Router();

router.use('/user', userRoutes)
router.use('/home', Authenticate, homeRoutes)

export default router
