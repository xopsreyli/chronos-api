import { Router } from 'express'
import controllerHandler from '../../middleware/controllerHandler/controllerHandler.js'
import * as controller from '../../controllers/calendar/controller.js'

const router: Router = Router()

router.get('/:id', controllerHandler(controller.getOne))
router.post('/', controllerHandler(controller.create))
router.patch('/:id', controllerHandler(controller.update))
router.delete('/:id', controllerHandler(controller.remove))

export default router
