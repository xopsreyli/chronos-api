import createEventService from '../../../utils/createEventService/createEventService.js'
import prisma from '../../../lib/prisma/prisma.js'
import type { Arrangement } from '../../../generated/prisma/client.js'

export default createEventService<Arrangement>(prisma.arrangement)
