import React, { useContext, useState } from "react";
import Logo from '../assets/Logo.png'
import Google from '../assets/Google.png'
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { Auth, Provider } from "../../utils/Firebase";
import { UserDataContext } from "../context/UserContext";
function Registration() {
    let  Navigate = useNavigate()
    let [Show,Setshow] = useState()
    let {ServerUrl} = useContext(authDataContext)
    let [name,setname] = useState('')
    let [email,setemail] = useState('')
    let [password,setpassword] = useState('')
    let {getCurrentUser, UserData} = useContext(UserDataContext)
    const Handlesingup = async (e)=>{
        e.preventDefault()
        try {
           const Result = await axios.post(ServerUrl+'/api/auth/registration',{
            name,email,password
           },{withCredentials: true})
           getCurrentUser()
           Navigate('/')
           console.log(Result.data)
        } catch (err) {
            console.log(err)
        }
    }
    const GoogleSingup = async()=>{
        try {
            const Response = await signInWithPopup(Auth,Provider)
            let User = Response.user
            console.log(User)
            let name = User.displayName;
            let email = User.email
            const Result = await axios.post(ServerUrl+'/api/auth/googlelogin',{
                name,email
            },{withCredentials: true})
            console.log(Result.data)
            getCurrentUser()
            Navigate('/')
        } catch (error) {
            console.log(error,'googlelogin error')
        }
    }
    return(
        <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer" onClick={()=>Navigate('/')}>
                <img className="w-[40px]" src={Logo} alt="" />
                <h1 className="text-[22px] font-sans">PakistanMart</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
                <span className="text-[25px] font-semibold">Registoration page</span>
                <span className="text-[16px]">welcome to pakistan part place your order</span>
            </div>
            <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
                <form action="" onSubmit={Handlesingup} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
                    <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={GoogleSingup}>
                        <img className="w-[80px]" src={Google} alt="" />Registration with google
                    </div>
                    <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
                        <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
                    </div>
                    <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
                        <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="UserName" required onChange={(e)=>setname(e.target.value)} value={name}/>
                        <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="email" required onChange={(e)=>setemail(e.target.value)} value={email}/>
                        <input type={Show?'text':'password'} className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="password" required onChange={(e)=>setpassword(e.target.value)} value={password}/>
                        {!Show &&<IoEyeOutline className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]" onClick={()=>Setshow(prev => !prev)}/>}
                        {Show &&<MdRemoveRedEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]" onClick={()=>Setshow(prev => !prev)} />}
                        <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">Create Account</button>
                        <p className="flex gap-[10px]">You have a any account?<span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={()=>Navigate('/login')}>Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration
