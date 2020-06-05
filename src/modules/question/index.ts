import { Router } from 'express'
import questionController from './question.controller'

const router = Router()

router.post('/question', questionController.create)
router.get('/question', questionController.list)

router.get('/question/all', questionController.listAll)
router.get('/question/select/:id', questionController.select)

export default router
