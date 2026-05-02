import type { Settings } from '../../generated/prisma/client.js'

export type SettingsUpdationData = Partial<Omit<Settings, 'id' | 'userId'>>
