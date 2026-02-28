import type { Request, Response } from 'express'
import * as service from '../../services/auth/service.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'

const signUp = async (req: Request, res: Response) => {
    const token: string = await service.signUp(req.body)
    const cookieExpireDate: Date = new Date(Date.now() + 24 * 60 * 60 * 1000)

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: cookieExpireDate,
    }).sendStatus(statusCodes.CREATED)
}

const signIn = async (req: Request, res: Response) => {
    const token: string = await service.signIn(req.body)
    const cookieExpireDate: Date = new Date(Date.now() + 24 * 60 * 60 * 1000)

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: cookieExpireDate,
    }).sendStatus(statusCodes.OK)
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    }).sendStatus(statusCodes.OK)
}

export { signUp, signIn, logout }
