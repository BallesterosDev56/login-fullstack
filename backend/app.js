import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './src/routes/userRoutes.js'
import { graphRouter } from './src/routes/graphRoutes.js'

dotenv.config()
const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))

app.use(express.json())
app.use(userRouter)
app.use(graphRouter)

app.listen(process.env.PORT, () => { console.log(`corriendo en el puerto ${process.env.PORT}`)})