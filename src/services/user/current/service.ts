import prisma from '../../../lib/prisma/prisma.js'
import type { User } from '../../../generated/prisma/client.js'
import type { UserPublic } from '../../../types/user/types.js'

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

export { getUser }
