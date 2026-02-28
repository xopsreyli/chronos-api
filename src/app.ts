import express from 'express'
import authRouter from './routes/auth/router.js'
import errorHandler from './middleware/errorHandler/errorHandler.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRouter)

app.use(errorHandler)

export default app
