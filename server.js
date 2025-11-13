import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/contactRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/dbConnection.js'
import { userRouter } from './routes/userRoutes.js'
import arcjetMiddleware from './middleware/arcjetMiddleware.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())
app.use(arcjetMiddleware)

app.use('/api/contacts', router)
app.use('/api/users', userRouter)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
    console.log("ARCJET_KEY:", process.env.ARCJET_KEY);

    
})