import express from 'express'
import { adminLogin, Googlelogin, login, Logout, registration } from '../controller/authcontroller.js'

const authRoutes = express.Router()

authRoutes.post('/registration',registration)
authRoutes.post('/login',login)
authRoutes.get('/logout',Logout)
authRoutes.post('/googlelogin',Googlelogin)
authRoutes.post('/adminlogin',adminLogin)


export default authRoutes