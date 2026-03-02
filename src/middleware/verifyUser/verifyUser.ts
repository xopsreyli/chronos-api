import type { NextFunction, Request, Response } from 'express'
import AppError from '../../utils/AppError/AppError.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'
import errorMessages from '../../enums/error/messages/enums.js'
import jwt from 'jsonwebtoken'

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.authToken

    if (!token) {
        throw new AppError(
            statusCodes.UNAUTHORIZED,
            errorMessages.general.UNAUTHORIZED,
        )
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number
        }

        req.userId = decoded.userId
        next()
    } catch (e) {
        throw new AppError(
            statusCodes.UNAUTHORIZED,
            errorMessages.general.UNAUTHORIZED,
        )
    }
}

export default verifyUser
