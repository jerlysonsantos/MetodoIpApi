import { Router } from 'express'
import AuthMiddleware from '../../middlewares/auth.middleware'
import questionController from './question.controller'

const router = Router()

router.post('/question', AuthMiddleware, questionController.create)
router.get('/question', AuthMiddleware, questionController.list)

router.get('/question/all', questionController.listAll)
router.get('/question/select/:id', questionController.select)

router.put('/question/:id', questionController.update)

router.get('/rate/:rate', AuthMiddleware, questionController.rate)
router.get('/rate', AuthMiddleware, questionController.getRate)

export default router
