import { Router } from 'express'
import { errorWrap } from '../utils'
import validate from '../middleware/validate'
import schema from '../validators/comment'
import * as commentController from '../controllers/comment'

const router = Router()

router.post('/', validate(schema.create), errorWrap(commentController.create))
router.get('/', validate(schema.list), errorWrap(commentController.list))
router.get('/:id', validate(schema.one), errorWrap(commentController.one))
router.put('/:id', validate(schema.update), errorWrap(commentController.update))
router.delete('/:id', validate(schema.remove), errorWrap(commentController.remove))

router.post('/:id/votes', validate(schema.vote), errorWrap(commentController.vote))

export default router
