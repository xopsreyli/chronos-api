import type { Request, Response } from 'express'
import * as service from '../../services/calendar/service.js'
import type { Calendar } from '../../generated/prisma/client.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import type {
    CalendarCreationData,
    CalendarUpdateData,
} from '../../types/calendar/calendar.js'

const getOne = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    const calendar: Calendar = await service.getOne(id, userId)

    res.status(statusCodes.OK).json(calendar)
}

const create = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const data: CalendarCreationData = req.body
    const calendar: Calendar = await service.create(data, userId)

    res.status(statusCodes.CREATED).json(calendar)
}

const update = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    const data: CalendarUpdateData = req.body
    const calendar: Calendar = await service.update(id, data, userId)

    res.status(statusCodes.OK).json(calendar)
}

const remove = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    await service.remove(id, userId)

    res.sendStatus(statusCodes.NO_CONTENT)
}

export { getOne, create, update, remove }
