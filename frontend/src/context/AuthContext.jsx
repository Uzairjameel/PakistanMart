import React, { createContext } from "react";
export const authDataContext = createContext()
let ServerUrl = "https://pakistanmart-production.up.railway.app"
let value = {
    ServerUrl
}
function AuthContext({children}) {
    return(
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </div>
    )
}

export default AuthContext
