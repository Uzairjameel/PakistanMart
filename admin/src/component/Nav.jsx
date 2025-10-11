import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png'
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/Authcontext";
import { AdminDataContext } from "../context/AdminContext";

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(AdminDataContext)
    const LogOut = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/auth/logout',{withCredentials:true})
            console.log(result.data)
            getAdmin()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hiddden shadow-md shadow-black">
            <div className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer" onClick={()=>navigate('/')}>
                <img src={Logo} alt="" className="w-[30px] "/>
                <h1 className="text-[25px] text-[black] font-sans">PakistanMart</h1>
            </div>
            <button className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white" onClick={LogOut}>
                    LogOut
                </button>
        </div>
    )
}

export default Nav