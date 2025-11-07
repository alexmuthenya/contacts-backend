import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { validateToken } from '../middleware/validateTokenHandler.js'
import { current, login, register } from '../controllers/userController.js'

export const userRouter = express.Router()


userRouter.post('/register',expressAsyncHandler(register))

userRouter.post('/login', expressAsyncHandler(login))
userRouter.get('/current', validateToken,  expressAsyncHandler(current))