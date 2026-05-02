import prisma from '../../../lib/prisma/prisma.js'
import type { Settings, User } from '../../../generated/prisma/client.js'
import type { UserPublic } from '../../../types/user/types.js'
import type { SettingsUpdationData } from '../../../types/settings/types.js'

const getUser = async (id: number): Promise<UserPublic> => {
    const { password, ...userData }: User = await prisma.user.findUniqueOrThrow(
        {
            where: {
                id: id,
            },
        },
    )

    return userData
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

export { getUser, getSettings, updateSettings }
