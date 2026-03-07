export type CalendarCreationData = {
    name: string
    description?: string
}

export type CalendarUpdateData = Partial<CalendarCreationData>
