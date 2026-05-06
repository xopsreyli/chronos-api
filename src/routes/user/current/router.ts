import { Router } from 'express'
import verifyUser from '../../../middleware/verifyUser/verifyUser.js'
import controllerHandler from '../../../middleware/controllerHandler/controllerHandler.js'
import * as controller from '../../../controllers/user/current/controller.js'

const router: Router = Router()

router.use(verifyUser)

router.get('/', controllerHandler(controller.getUser))
router.patch('/nickname', controllerHandler(controller.updateNickname))
router.patch('/password', controllerHandler(controller.updatePassword))
router.get('/settings', controllerHandler(controller.getSettings))
router.patch('/settings', controllerHandler(controller.updateSettings))

export default router
