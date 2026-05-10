import { Router } from 'express'
import controllerHandler from '../../middleware/controllerHandler/controllerHandler.js'
import * as controller from '../../controllers/calendar/controller.js'
import verifyUser from '../../middleware/verifyUser/verifyUser.js'

const router: Router = Router()

router.use(verifyUser)

router.get('/', controllerHandler(controller.getAll))
router.get('/invites', controllerHandler(controller.getInvites))
router.post('/', controllerHandler(controller.create))
router.post('/invites/:id', controllerHandler(controller.respondToInvite))
router.get('/:id', controllerHandler(controller.getOne))
router.patch('/:id', controllerHandler(controller.update))
router.delete('/:id', controllerHandler(controller.remove))
router.get('/:id/events', controllerHandler(controller.getEvents))
router.post('/:id/events', controllerHandler(controller.createEvent))
router.post('/:id/invite', controllerHandler(controller.invite))

export default router
