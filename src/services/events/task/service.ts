import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type { Task } from '../../../generated/prisma/client.js'

export default createEventService<Task>(prisma.task)
