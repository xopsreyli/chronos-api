import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type { Task } from '../../../generated/prisma/client.js'

const service = createEventService<Task>(prisma.task)

const getAllByCalendar = (
    calendarId: number,
    from: string,
    to: string,
): Promise<Task[]> => {
    return prisma.task.findMany({
        where: {
            calendarId,
            dateTime: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
    })
}

export default { ...service, getAllByCalendar }
