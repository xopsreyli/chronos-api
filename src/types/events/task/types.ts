export type TaskCreationData = {
    title: string
    description: string
    dateTime: Date
}

export type TaskUpdateData = Partial<TaskCreationData>
