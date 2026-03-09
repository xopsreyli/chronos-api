import type {
    Arrangement,
    Reminder,
    Task,
} from '../../generated/prisma/client.js'
import { ARRANGEMENT, REMINDER, TASK } from '../../enums/events/enums.js'
import type {
    ArrangementCreationData,
    ArrangementUpdateData,
} from './arrangement/types.js'
import type {
    ReminderCreationData,
    ReminderUpdateData,
} from './reminder/types.js'
import type { TaskCreationData, TaskUpdateData } from './task/types.js'

export type Event = Arrangement | Reminder | Task

export type EventType = typeof ARRANGEMENT | typeof REMINDER | typeof TASK

export type EventCreationData =
    | ArrangementCreationData
    | ReminderCreationData
    | TaskCreationData

export type EventUpdateData =
    | ArrangementUpdateData
    | ReminderUpdateData
    | TaskUpdateData

export type CalendarEvents = {
    arrangements: Arrangement[]
    reminders: Reminder[]
    tasks: Task[]
}
