import { Router } from 'express'
import { errorWrap } from '../utils'
import * as homeController from '../controllers/home'

const router = Router();

router.get('/', errorWrap(homeController.welcome))

export default router
