export type ReminderCreationData = {
    title: string
    description: string
    dateTime: Date
}

export type ReminderUpdateData = Partial<ReminderCreationData>
