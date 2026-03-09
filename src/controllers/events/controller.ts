import type { Request, Response } from 'express'
import type {
    Event,
    EventType,
    EventUpdateData,
} from '../../types/events/types.js'
import * as service from '../../services/events/service.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'

const update = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const type = req.query.type as EventType
    const id: number = Number(req.params.id)
    const data: EventUpdateData = req.body
    const event: Event = await service.update(type, id, data, userId)

    res.status(statusCodes.OK).json(event)
}

const remove = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const type = req.query.type as EventType
    const id: number = Number(req.params.id)
    await service.remove(type, id, userId)

    res.sendStatus(statusCodes.NO_CONTENT)
}

export { update, remove }
