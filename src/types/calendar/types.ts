export type CalendarCreationData = {
    name: string
    description?: string
    color?: string
}

export type CalendarUpdateData = Partial<CalendarCreationData>
