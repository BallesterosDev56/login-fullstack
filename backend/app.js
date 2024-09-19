import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './src/routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))
app.use(userRouter)

app.listen(process.env.PORT, () => { console.log(`corriendo en el puerto ${process.env.PORT}`)})