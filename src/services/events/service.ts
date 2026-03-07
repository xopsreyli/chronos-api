import type {
    CalendarEvents,
    Event,
    EventCreationData,
    EventType,
} from '../../types/events/types.js'
import arrangementService from './arrangement/service.js'
import reminderService from './reminder/service.js'
import taskService from './task/service.js'
import verifyCalendarAccess from '../../middleware/verifyCalendarAccess/verifyCalendarAccess.js'
import { ARRANGEMENT, REMINDER, TASK } from '../../enums/events/enums.js'

const eventServices = {
    [ARRANGEMENT]: arrangementService,
    [REMINDER]: reminderService,
    [TASK]: taskService,
}

const getCalendarEvents = async (
    calendarId: number,
    userId: number,
): Promise<CalendarEvents> => {
    await verifyCalendarAccess(calendarId, userId)

    const [arrangements, reminders, tasks] = await Promise.all([
        arrangementService.getAllByCalendar(calendarId),
        reminderService.getAllByCalendar(calendarId),
        taskService.getAllByCalendar(calendarId),
    ])

    return { arrangements, reminders, tasks }
}

const createEvent = async (
    type: EventType,
    data: EventCreationData,
    calendarId: number,
    userId: number,
): Promise<Event> => {
    await verifyCalendarAccess(calendarId, userId)

    return eventServices[type].create(data, calendarId, userId)
}

export { getCalendarEvents, createEvent }
