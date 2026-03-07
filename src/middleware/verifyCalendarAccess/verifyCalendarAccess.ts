import AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'
import type { UserCalendar } from '../../generated/prisma/client.js'
import prisma from '../../lib/prisma/prisma.js'
import type { Nullable } from '../../types/common.js'

const verifyAccess = async (
    calendarId: number,
    userId: number,
): Promise<void> => {
    const relation: Nullable<UserCalendar> =
        await prisma.userCalendar.findUnique({
            where: {
                userId_calendarId: { userId, calendarId },
            },
        })

    if (!relation) {
        throw new AppError(
            statusCodes.FORBIDDEN,
            errorMessages.general.FORBIDDEN,
        )
    }
}

export default verifyAccess
