import type { Event, EventCreationData } from '../../types/events/types.js'

const createEventService = <T extends Event>(model: any) => {
    const getAllByCalendar = (calendarId: number): Promise<T[]> => {
        return model.findMany({ where: { calendarId } })
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

    return { getAllByCalendar, create }
}

export default createEventService
