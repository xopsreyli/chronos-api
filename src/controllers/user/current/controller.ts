import type { Request, Response } from 'express'
import * as service from '../../../services/user/current/service.js'
import statusCodes from '../../../enums/response/statusCodes/enums.js'
import type { UserPublic } from '../../../types/user/types.js'

const getUser = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const user: UserPublic = await service.getUser(id)

    res.status(statusCodes.OK).json(user)
}

export { getUser }
