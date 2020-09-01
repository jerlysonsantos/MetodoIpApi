import { Router } from 'express'
import AuthMiddleware from '../../middlewares/auth.middleware'
import palestranteController from './palestrante.controller'

const router = Router()

router.post('/palestrante', AuthMiddleware, palestranteController.create)
router.get('/palestrante', AuthMiddleware, palestranteController.list)

router.put('/palestrante/:id', palestranteController.update)
router.delete('/palestrante/:id', palestranteController.delete)


export default router
