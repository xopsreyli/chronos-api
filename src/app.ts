import express, { type Express } from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/router.js'
import calendarRouter from './routes/calendar/router.js'
import errorHandler from './middleware/errorHandler/errorHandler.js'

const app: Express = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/calendars', calendarRouter)

app.use(errorHandler)
export default app
