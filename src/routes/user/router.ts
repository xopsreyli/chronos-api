import { Router } from 'express'
import verifyUser from '../../middleware/verifyUser/verifyUser.js'
import controllerHandler from '../../middleware/controllerHandler/controllerHandler.js'
import * as controller from '../../controllers/user/controller.js'

const router: Router = Router()

router.use(verifyUser)

router.get('/', controllerHandler(controller.getAll))

export default router
