import { Router } from 'express'
import AuthMiddleware from '../../middlewares/auth.middleware'
import UrlController from './url.controller'

const router = Router()

router.post('/setURL', AuthMiddleware, UrlController.setUrl)
router.get('/getURL', AuthMiddleware, UrlController.getUrl)

export default router
