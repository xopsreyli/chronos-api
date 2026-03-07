import prisma from '../../lib/prisma/prisma.js'
import type { Calendar } from '../../generated/prisma/client.js'
import type {
    CalendarCreationData,
    CalendarUpdateData,
} from '../../types/calendar/types.js'
import verifyCalendarAccess from '../../middleware/verifyCalendarAccess/verifyCalendarAccess.js'

const getOne = async (id: number, userId: number): Promise<Calendar> => {
    await verifyCalendarAccess(id, userId)

    return prisma.calendar.findFirstOrThrow({ where: { id } })
}

const create = (
    data: CalendarCreationData,
    userId: number,
): Promise<Calendar> => {
    return prisma.calendar.create({
        data: {
            ...data,
            users: {
                create: {
                    userId,
                },
            },
        },
    })
}

const update = async (
    id: number,
    data: CalendarUpdateData,
    userId: number,
): Promise<Calendar> => {
    await verifyCalendarAccess(id, userId)

    return prisma.calendar.update({
        where: { id },
        data,
    })
}

const remove = async (id: number, userId: number): Promise<void> => {
    await verifyCalendarAccess(id, userId)
    await prisma.calendar.delete({
        where: { id },
    })
}

export { getOne, create, update, remove }
