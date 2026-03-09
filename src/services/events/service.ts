import type {
    CalendarEvents,
    Event,
    EventCreationData,
    EventType,
    EventUpdateData,
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

const create = async (
    type: EventType,
    data: EventCreationData,
    calendarId: number,
    userId: number,
): Promise<Event> => {
    await verifyCalendarAccess(calendarId, userId)

    return eventServices[type].create(data, calendarId, userId)
}

const update = (
    type: EventType,
    id: number,
    data: EventUpdateData,
    userId: number,
): Promise<Event> => {
    return eventServices[type].update(id, data, userId)
}

const remove = async (
    type: EventType,
    id: number,
    userId: number,
): Promise<void> => {
    await eventServices[type].remove(id, userId)
}

export { getCalendarEvents, create, update, remove }
