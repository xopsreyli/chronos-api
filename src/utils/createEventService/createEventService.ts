import type {Event, EventCreationData, EventUpdateData,} from '../../types/events/types.js'
import verifyEventAccess from '../../middleware/verifyEventAccess/verifyEventAccess.js'

const createEventService = <T extends Event>(model: any) => {
    const getAllByCalendar = (calendarId: number, from: string, to: string): Promise<T[]> => {
        let dateField: string
        if ('from' in model.fields) dateField = 'from'
        else if ('dateTime' in model.fields) dateField = 'dateTime'
        else if ('date' in model.fields) dateField = 'date'

        return model.findMany({
            where: {
                calendarId,
                [dateField!]: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
            }
        })
    }

    const create = (
        data: EventCreationData,
        calendarId: number,
        userId: number,
    ): Promise<T> => {
        return model.create({
            data: {
                userId,
                calendarId,
                ...data,
            },
        })
    }

    const update = async (
        id: number,
        data: EventUpdateData,
        userId: number,
    ): Promise<T> => {
        await verifyEventAccess(model, id, userId)

        return model.update({
            where: {id},
            data,
        })
    }

    const remove = async (id: number, userId: number): Promise<void> => {
        await verifyEventAccess(model, id, userId)
        await model.delete({where: {id}})
    }

    return {getAllByCalendar, create, update, remove}
}

export default createEventService
