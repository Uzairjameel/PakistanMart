import validator from 'validator'
import bcrypt from 'bcryptjs'
import User from "../model/userModel.js"
import { genToken, genToken1 } from "../config/token.js"

export const registration = async (req,res)=>{
    try {
        const{name,email,password} = req.body
        console.log(req.body)
        const existuser = await User.findOne({email})
        if (existuser) {
            return res.status(400).json({message:'user already exist'})
        } 
        if (!validator.isEmail(email)) {
            return res.status(400).json({message:'enter valid email'})
        }
        if (password.length<8){
            return res.status(400).json({message:'enter strong password'})

        }
        let hashpassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashpassword})
        let token = genToken(user._id);
           res.cookie('token', token, {
                httpOnly: true,
                secure: true,        // HTTPS par 'true' karna
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
            });
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.send({error})
    }
}

export const login = async(req,res)=>{
    try {
        const{email,password}=req.body
        let user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message:'user is not found'})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(404).json({message:'password is incorrect'})
        }
         let token = genToken(user._id);
           res.cookie('token', token, {
                httpOnly: true,
                secure: true,        // HTTPS par 'true' karna
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
            });
        return res.status(201).json({user,message:'login successfully'})
    } catch (error) {
        return res.send('login errror',{error})
    }
}

export const Logout = async (req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(200).json({message:'logout succesfully'})
    } catch (error) {
        return res.send('logout error',{error})
    }
}

export const Googlelogin = async (req,res)=>{
    try {
        const{name,email} = req.body
         let user = await User.findOne({email})
        if (!user) {
             user = await User.create({name,email})
        }
        
        let token = genToken(user._id);
           res.cookie('token', token, {
                httpOnly: true,
                secure: true,        // HTTPS par 'true' karna
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
            });
        return res.status(200).json(user)
    } catch (error) {
        console.log('Google login error:', error.message);
  return res.status(500).json({message: 'Google login error', error: error.message});
    }
}

export const adminLogin = async (req,res) => {
    try {
        let {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            let token = genToken1(email);
           res.cookie('token', token, {
                httpOnly: true,
                secure: true,        // HTTPS par 'true' karna
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
            });
            return res.status(200).json(token)
        }
        return res.status(400).json({message:'invalid creadintials'})
    } catch (error) {
        console.log('Adminlogin error')
        return res.status(500).json({message:`Adminlogin error ${error}`})
    }
}
