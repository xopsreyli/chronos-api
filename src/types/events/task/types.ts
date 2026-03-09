export type TaskCreationData = {
    title: string
    description: string
    date: Date
}

export type TaskUpdateData = Partial<TaskCreationData>
