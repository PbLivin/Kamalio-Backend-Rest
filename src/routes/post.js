import { Router } from 'express'
import { errorWrap } from '../utils'
import * as postController from '../controllers/post'
import upload from '../middleware/upload'
import validate from '../middleware/validate'
import schema from '../validators/post'

const router = Router()

router.get('/', validate(schema.list), errorWrap(postController.list))
router.get('/:id', validate(schema.one), errorWrap(postController.one))
router.post('/', validate(schema.create), errorWrap(postController.create))
router.put('/:id', validate(schema.update), errorWrap(postController.update))
router.put('/:id/photo', validate(schema.putPostPhoto), upload, errorWrap(postController.putPostPhoto))
router.delete('/:id', validate(schema.remove), errorWrap(postController.remove))

router.post('/:id/votes', validate(schema.vote), errorWrap(postController.vote))

export default router
