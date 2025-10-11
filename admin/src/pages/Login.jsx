import React, { useContext, useState } from "react";
import Logo from '../assets/Logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { authDataContext } from "../context/Authcontext";
import { AdminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
     let [email,setemail] = useState('')
     let [password,setpassword] = useState('')
     let [Show,Setshow] = useState(false)
     let {serverUrl} = useContext(authDataContext)
     let {adminData,getAdmin} = useContext(AdminDataContext)
     let navigate = useNavigate()
     const AdminLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/adminlogin',{email,password},{withCredentials:true})
            console.log(result.data)
            toast.success('AdminLogin successfull')
            getAdmin()
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('AdminLogin failed')
        }
     }
    return(
               <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
                     <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
                         <img className="w-[40px]" src={Logo} alt="" />
                         <h1 className="text-[22px] font-sans">PakistanMart</h1>
                     </div>
                     <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
                         <span className="text-[25px] font-semibold">Login page</span>
                         <span className="text-[16px]">welcome to pakistan part Apply to Admin login</span>
                     </div>
                     <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
                         <form action="" onSubmit={AdminLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
                             <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
                                 <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="email" required onChange={(e)=>setemail(e.target.value)} value={email}/>
                                 <input type={Show?'text':'password'} className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="password" required onChange={(e)=>setpassword(e.target.value)} value={password}/>
                                 {!Show &&<IoEyeOutline className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]" onClick={()=>Setshow(prev => !prev)}/>}
                                 {Show &&<MdRemoveRedEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]" onClick={()=>Setshow(prev => !prev)} />}
                                 <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer">Login</button>
                             </div>
                         </form>
                     </div>
                 </div>
    )
}

export default Login