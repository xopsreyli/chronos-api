import prisma from '../../../lib/prisma/prisma.js'
import type { Settings, User } from '../../../generated/prisma/client.js'
import type {
    NicknameUpdationData,
    PasswordUpdationData,
    UserPublic,
} from '../../../types/user/types.js'
import type { SettingsUpdationData } from '../../../types/settings/types.js'
import bcrypt from 'bcrypt'
import AppError from '../../../utils/AppError/AppError.js'
import statusCodes from '../../../enums/response/statusCodes/enums.js'
import errorMessages from '../../../enums/error/messages/enums.js'
import { SALT_ROUNDS } from '../../../enums/bcrypt/enums.js'

const getUser = async (id: number): Promise<UserPublic> => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            nickname: true,
            email: true,
        },
    })
}

const updateNickname = async (
    id: number,
    data: NicknameUpdationData,
): Promise<UserPublic> => {
    return prisma.user.update({
        where: { id },
        data: { nickname: data.nickname },
        select: {
            id: true,
            nickname: true,
            email: true,
        },
    })
}

const updatePassword = async (id: number, data: PasswordUpdationData) => {
    const user: User = await prisma.user.findUniqueOrThrow({
        where: { id },
    })

    const isPasswordValid: boolean = await bcrypt.compare(
        data.password,
        user.password,
    )
    if (!isPasswordValid) {
        throw new AppError(
            statusCodes.FORBIDDEN,
            errorMessages.user.WRONG_PASSWORD,
        )
    }

    const newHashedPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS)

    await prisma.user.update({
        where: { id },
        data: {
            password: newHashedPassword,
        },
    })
}

const getSettings = (userId: number): Promise<Settings> => {
    return prisma.settings.findUniqueOrThrow({
        where: {
            userId,
        },
    })
}

const updateSettings = (userId: number, data: SettingsUpdationData) => {
    return prisma.settings.update({
        where: { userId },
        data,
    })
}

export { getUser, updateNickname, updatePassword, getSettings, updateSettings }
