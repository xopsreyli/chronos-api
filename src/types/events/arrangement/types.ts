export type ArrangementCreationData = {
    title: string
    description: string
    from: Date
    to: Date
}

export type ArrangementUpdateData = Partial<ArrangementCreationData>
