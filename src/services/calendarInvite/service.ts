import type {
    InviteData,
    RespondeToInviteData,
} from '../../types/calendar/invite/types.js'
import prisma from '../../lib/prisma/prisma.js'

const getInvites = (userId: number) => {
    return prisma.calendarInvite.findMany({
        where: {
            inviteeId: userId,
        },
        include: {
            inviter: {
                select: {
                    id: true,
                    nickname: true,
                    email: true,
                },
            },
            calendar: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    color: true,
                },
            },
        },
    })
}

const invite = async (
    id: number,
    userId: number,
    data: InviteData,
): Promise<void> => {
    await prisma.calendarInvite.createMany({
        data: data.userIds.map((inviteeId) => ({
            calendarId: id,
            inviterId: userId,
            inviteeId: inviteeId,
        })),
        skipDuplicates: true,
    })
}

const respond = async (
    id: number,
    data: RespondeToInviteData,
): Promise<void> => {
    const { isAccepted } = data

    await prisma.$transaction(async (tx) => {
        const invite = await prisma.calendarInvite.delete({
            where: { id },
        })

        if (isAccepted) {
            await prisma.userCalendar.create({
                data: {
                    userId: invite.inviteeId,
                    calendarId: invite.calendarId,
                },
            })
        }
    })
}

export { getInvites, invite, respond }
