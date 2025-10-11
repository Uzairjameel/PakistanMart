import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./Authcontext";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";

export const AdminDataContext = createContext()

function AdminContext({children}) {
    let [adminData,setAdminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)
    const getAdmin = useCallback(async () => {
        try {
            let result = await axios.get(serverUrl+'/api/user/getadmin',{withCredentials:true})
            setAdminData(result.data)
            console.log(result.data)
        } catch (error) {
            setAdminData(null)
            console.log(error)
        }
    },[serverUrl])
    useEffect(()=>{
        getAdmin()
    },[getAdmin])
    let value = {
        adminData,setAdminData,getAdmin
    }
    return(
        <div>
            <AdminDataContext.Provider value={value}>
                {children}
            </AdminDataContext.Provider>
        </div>
    )
}

export default AdminContext