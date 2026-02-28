import type { NextFunction, Request, Response } from 'express'
import type AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'

const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const status: number = err.status || statusCodes.INTERNAL_SERVER_ERROR
    const message: string =
        err.message || errorMessages.general.INTERNAL_SERVER_ERROR

    res.status(status).json({
        status,
        message,
    })
}

export default errorHandler
