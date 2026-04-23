import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type {Reminder} from '../../../generated/prisma/client.js'

const service = createEventService<Reminder>(prisma.reminder)

const getAllByCalendar = (calendarId: number, from: string, to: string): Promise<Reminder[]> => {
    return prisma.reminder.findMany({
        where: {
            calendarId,
            dateTime: {
                gte: new Date(from),
                lte: new Date(to)
            }
        }
    })
}

export default {...service, getAllByCalendar}
