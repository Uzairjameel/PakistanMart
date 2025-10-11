import express from 'express'
import { getAdmin, Getcurrentuser } from '../controller/usercontroller.js'
import isAuth from '../middleware/isAuth.js'
import adminAuth from '../middleware/adminAuth.js'

const userRoutes = express.Router()

userRoutes.get('/getcurrentuser',isAuth,Getcurrentuser)
userRoutes.get('/getadmin',adminAuth,getAdmin)

export default userRoutes