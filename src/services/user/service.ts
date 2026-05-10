import prisma from '../../lib/prisma/prisma.js'
import type { UserPublic } from '../../types/user/types.js'

const getAll = (nickname: string, page: number): Promise<UserPublic[]> => {
    const limit: number = 5
    const offset: number = (page - 1) * limit

    return prisma.user.findMany({
        where: {
            nickname: {
                contains: nickname,
                mode: 'insensitive',
            },
        },
        select: {
            id: true,
            nickname: true,
            email: true,
        },
        take: limit,
        skip: offset,
    })
}

export { getAll }
