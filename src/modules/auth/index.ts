import { Router } from 'express'
import AuthMiddleware from '../../middlewares/auth.middleware'
import AuthController from './auth.controller'

const router = Router()

router.post('/auth/login', AuthController.login)
router.post('/auth/checkToken', AuthMiddleware, AuthController.checkToken)

export default router
