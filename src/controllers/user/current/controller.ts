import type { Request, Response } from 'express'
import * as service from '../../../services/user/current/service.js'
import statusCodes from '../../../enums/response/statusCodes/enums.js'
import type { UserPublic } from '../../../types/user/types.js'
import type { Settings } from '../../../generated/prisma/client.js'

const getUser = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const user: UserPublic = await service.getUser(id)

    res.status(statusCodes.OK).json(user)
}

const getSettings = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const settings: Settings = await service.getSettings(id)

    res.status(statusCodes.OK).json(settings)
}

export { getUser, getSettings }
