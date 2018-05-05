import { Router } from 'express'
import { errorWrap } from '../utils'
import * as postController from '../controllers/post'

const router = Router()

router.get('/', errorWrap(postController.readAll))
router.get('/:id', errorWrap(postController.readOne))
router.post('/', errorWrap(postController.create))
router.put('/:id', errorWrap(postController.update))
router.delete('/:id', errorWrap(postController.remove))

export default router
