import type { Request, Response } from 'express'
import * as service from '../../services/calendar/service.js'
import type { Calendar } from '../../generated/prisma/client.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import type {
    CalendarCreationData,
    CalendarUpdateData,
} from '../../types/calendar/types.js'
import type {
    CalendarEvents,
    Event,
    EventCreationData,
    EventType,
} from '../../types/events/types.js'
import * as eventsService from '../../services/events/service.js'
import type {
    InviteData,
    RespondeToInviteData,
} from '../../types/calendar/invite/types.js'
import * as calendarInviteService from '../../services/calendarInvite/service.js'

const getAll = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const calendars: Calendar[] = await service.getAll(userId)

    res.status(statusCodes.OK).json(calendars)
}

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

const getEvents = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    const from = req.query.from as string
    const to = req.query.to as string
    const events: CalendarEvents = await eventsService.getCalendarEvents(
        id,
        userId,
        from,
        to,
    )

    res.status(statusCodes.OK).json(events)
}

const createEvent = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    const type = req.query.type as EventType
    const data: EventCreationData = req.body
    const event: Event = await eventsService.create(type, data, id, userId)

    res.status(statusCodes.CREATED).json(event)
}

const getInvites = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const invites = await calendarInviteService.getInvites(userId)

    res.status(statusCodes.OK).json(invites)
}

const invite = async (req: Request, res: Response) => {
    const userId: number = req.userId!
    const id: number = Number(req.params.id)
    const data: InviteData = req.body
    await calendarInviteService.invite(id, userId, data)

    res.sendStatus(statusCodes.NO_CONTENT)
}

const respondToInvite = async (req: Request, res: Response) => {
    const inviteId: number = Number(req.params.id)
    const data: RespondeToInviteData = req.body
    await calendarInviteService.respond(inviteId, data)

    res.sendStatus(statusCodes.NO_CONTENT)
}

export {
    getAll,
    getOne,
    create,
    update,
    remove,
    getEvents,
    createEvent,
    getInvites,
    invite,
    respondToInvite,
}
