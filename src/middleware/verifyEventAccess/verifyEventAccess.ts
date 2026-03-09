import type { Event } from '../../types/events/types.js'
import AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'

const verifyEventAccess = async (
    model: any,
    id: number,
    userId: number,
): Promise<void> => {
    const event: Event = await model.findUniqueOrThrow({ where: { id } })

    if (event.userId !== userId) {
        throw new AppError(
            statusCodes.FORBIDDEN,
            errorMessages.general.FORBIDDEN,
        )
    }
}

export default verifyEventAccess
