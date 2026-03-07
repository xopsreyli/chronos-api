import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type { Reminder } from '../../../generated/prisma/client.js'

export default createEventService<Reminder>(prisma.reminder)
