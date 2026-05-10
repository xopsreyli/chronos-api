import type { Request, Response } from 'express'
import * as service from '../../services/user/service.js'
import type { UserPublic } from '../../types/user/types.js'
import statusCodes from '../../enums/response/statusCodes/enums.js'

const getAll = async (req: Request, res: Response) => {
    const nickname: string = (req.query.nickname as string) || ''
    const page: number = Number(req.query.page) || 1
    const users: UserPublic[] = await service.getAll(nickname, page)

    res.status(statusCodes.OK).json(users)
}

export { getAll }
