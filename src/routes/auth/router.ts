import { Router } from 'express'
import * as controller from '../../controllers/auth/controller.js'
import controllerHandler from '../../middleware/controllerHandler/controllerHandler.js'
import verifyUser from '../../middleware/verifyUser/verifyUser.js'

const router: Router = Router()

router.post('/signup', controllerHandler(controller.signUp))
router.post('/signin', controllerHandler(controller.signIn))
router.delete('/logout', verifyUser, controllerHandler(controller.logout))

export default router
