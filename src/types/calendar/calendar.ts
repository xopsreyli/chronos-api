import type { Calendar, UserCalendar } from '../../generated/prisma/client.js'

export type CalendarCreationData = {
    name: string
    description?: string
}

export type CalendarUpdateData = Partial<CalendarCreationData>

export type CalendarWithUsers = Calendar & { users: UserCalendar[] }
