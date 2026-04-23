import type {NextFunction, Request, Response} from 'express'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'
import AppError from '../../utils/AppError/AppError.js'
import {Prisma} from '../../generated/prisma/client.js'

const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    let status: number = statusCodes.INTERNAL_SERVER_ERROR,
        message: string = errorMessages.general.INTERNAL_SERVER_ERROR

    if (err instanceof AppError) {
        status = err.status
        message = err.message
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            status = statusCodes.NOT_FOUND
            message = errorMessages.general.NOT_FOUND
        }
    }

    res.status(status).json({
        status,
        message,
    })
}

export default errorHandler
