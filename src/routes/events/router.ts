import { Router } from 'express'
import verifyUser from '../../middleware/verifyUser/verifyUser.js'
import controllerHandler from '../../middleware/controllerHandler/controllerHandler.js'
import * as controller from '../../controllers/events/controller.js'

const router: Router = Router()

router.use(verifyUser)

router.patch('/:id', controllerHandler(controller.update))
router.delete('/:id', controllerHandler(controller.remove))

export default router
