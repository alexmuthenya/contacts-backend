import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/contactRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/dbConnection.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())

app.use(errorHandler)
app.use('/api/contacts', router)



app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
    
})