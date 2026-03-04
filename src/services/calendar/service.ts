import prisma from '../../lib/prisma/prisma.js'
import type {Calendar} from '../../generated/prisma/client.js'
import type {Nullable} from '../../types/common.js'
import AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'
import type {CalendarCreationData, CalendarUpdateData, CalendarWithUsers,} from '../../types/calendar/types.js'

const getCalendarWithUsers = async (id: number): Promise<CalendarWithUsers> => {
    const calendar: Nullable<CalendarWithUsers> =
        await prisma.calendar.findUnique({
            where: {id},
            include: {users: true},
        })

    if (!calendar) {
        throw new AppError(
            statusCodes.NOT_FOUND,
            errorMessages.general.NOT_FOUND,
        )
    }

    return calendar
}

const verifyAccess = (calendar: CalendarWithUsers, userId: number): void => {
    const isUserRelated: boolean = calendar.users.some(
        (u) => u.userId === userId,
    )
    if (!isUserRelated) {
        throw new AppError(
            statusCodes.FORBIDDEN,
            errorMessages.general.FORBIDDEN,
        )
    }
}

const getOne = async (id: number, userId: number): Promise<Calendar> => {
    const calendarWithUsers: CalendarWithUsers = await getCalendarWithUsers(id)
    verifyAccess(calendarWithUsers, userId)
    const {users, ...calendar} = calendarWithUsers

    return calendar
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
    const calendarWithUsers: CalendarWithUsers = await getCalendarWithUsers(id)
    verifyAccess(calendarWithUsers, userId)

    return prisma.calendar.update({
        where: {id},
        data,
    })
}

const remove = async (id: number, userId: number): Promise<void> => {
    const calendarWithUsers: CalendarWithUsers = await getCalendarWithUsers(id)
    verifyAccess(calendarWithUsers, userId)
    await prisma.calendar.delete({
        where: {id},
    })
}

export {getOne, create, update, remove}
