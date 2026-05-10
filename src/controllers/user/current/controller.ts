import type { Request, Response } from 'express'
import * as service from '../../../services/user/current/service.js'
import statusCodes from '../../../enums/response/statusCodes/enums.js'
import type {
    NicknameUpdationData,
    PasswordUpdationData,
    UserPublic,
} from '../../../types/user/types.js'
import type { Settings } from '../../../generated/prisma/client.js'
import type { SettingsUpdationData } from '../../../types/settings/types.js'

const getUser = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const user: UserPublic = await service.getUser(id)

    res.status(statusCodes.OK).json(user)
}

const updateNickname = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const data: NicknameUpdationData = req.body
    const user: UserPublic = await service.updateNickname(id, data)

    res.status(statusCodes.OK).json(user)
}

const updatePassword = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const data: PasswordUpdationData = req.body
    await service.updatePassword(id, data)

    res.sendStatus(statusCodes.NO_CONTENT)
}

const getSettings = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const settings: Settings = await service.getSettings(id)

    res.status(statusCodes.OK).json(settings)
}

const updateSettings = async (req: Request, res: Response) => {
    const id: number = req.userId!
    const data: SettingsUpdationData = req.body
    const settings: Settings = await service.updateSettings(id, data)

    res.status(statusCodes.OK).json(settings)
}

export { getUser, updateNickname, updatePassword, getSettings, updateSettings }
