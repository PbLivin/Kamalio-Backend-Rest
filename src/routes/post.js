import { Router } from 'express'
import { errorWrap } from '../utils'
import * as postController from '../controllers/post'
import upload from '../middleware/upload'

const router = Router()

router.get('/', errorWrap(postController.list))
router.get('/:id', errorWrap(postController.one))
router.post('/', errorWrap(postController.create))
router.put('/:id', errorWrap(postController.update))
router.put('/:id/photo', upload, errorWrap(postController.putPostPhoto))
router.delete('/:id', errorWrap(postController.remove))

router.post('/:id/votes', errorWrap(postController.vote))

export default router
