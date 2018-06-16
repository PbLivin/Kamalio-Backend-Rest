import { Router } from 'express'
import { errorWrap } from '../utils'
import * as commentController from '../controllers/comment'

const router = Router()

router.post('/', errorWrap(commentController.create))
router.get('/', errorWrap(commentController.list))
router.get('/:id', errorWrap(commentController.one))
router.put('/:id', errorWrap(commentController.update))
router.delete('/:id', errorWrap(commentController.remove))

router.post('/:id/votes', errorWrap(commentController.vote))

export default router
