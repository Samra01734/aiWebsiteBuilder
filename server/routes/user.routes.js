
import express from 'express'
import { getCurrentUser } from '../controllers/user.controllers.js'
import isAuth from '../middleware/isAuth.js'
import { generatedemo } from '../controllers/auth.controller.js'

const userRouter=express.Router()

userRouter.get('/me',isAuth,getCurrentUser)
// userRouter.get('/gen',generatedemo)


export default userRouter