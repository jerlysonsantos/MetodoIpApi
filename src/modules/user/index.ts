import { Router } from 'express'
import userController from './user.controller'

const router = Router()

router.get('/me', userController.me)
router.post('/register/:lead_id', userController.create)
router.post('/lead', userController.lead)

router.get('/lead/:id', userController.getLead)
router.get('/user', userController.list)
router.get('/user/:id', userController.getOne)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

export default router
