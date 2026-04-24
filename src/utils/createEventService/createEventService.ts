import type {
    Event,
    EventCreationData,
    EventUpdateData,
} from '../../types/events/types.js'
import verifyEventAccess from '../../middleware/verifyEventAccess/verifyEventAccess.js'

const createEventService = <T extends Event>(model: any) => {
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
            where: { id },
            data,
        })
    }

    const remove = async (id: number, userId: number): Promise<void> => {
        await verifyEventAccess(model, id, userId)
        await model.delete({ where: { id } })
    }

    return { create, update, remove }
}

export default createEventService
