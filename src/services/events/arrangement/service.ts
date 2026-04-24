import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type { Arrangement } from '../../../generated/prisma/client.js'

const service = createEventService<Arrangement>(prisma.arrangement)

const getAllByCalendar = (
    calendarId: number,
    from: string,
    to: string,
): Promise<Arrangement[]> => {
    return prisma.arrangement.findMany({
        where: {
            calendarId,
            OR: [
                { from: { gte: new Date(from), lte: new Date(to) } },
                { to: { gte: new Date(from), lte: new Date(to) } },
                {
                    from: { lt: new Date(from) },
                    to: { gt: new Date(to) },
                },
            ],
        },
    })
}

export default { ...service, getAllByCalendar }
