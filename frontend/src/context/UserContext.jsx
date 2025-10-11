import React, { useState, useEffect, useContext, createContext, useCallback } from "react";
import axios from "axios";
import { authDataContext } from "./authcontext";

export const UserDataContext = createContext();

function UserContext({ children }) {
  // 1) State banaya user data store karne ke liye
  const [UserData, SetUserData] = useState('');

  // 2) Backend server ka URL le rahe hain authDataContext se
  const { ServerUrl } = useContext(authDataContext);

  // 3) Function banaya jo current user ka data backend se laata hai.
  // useCallback use kar rahe hain taake function har render par naya na bane.
  const getCurrentUser = useCallback(async () => {
    try {
      let result = await axios.get(`${ServerUrl}/api/user/getcurrentuser`, { withCredentials: true });
      SetUserData(result.data);
      console.log(result.data);
    } catch (error) {
      SetUserData(null);
      console.log(error, 'getcurrentusererror');
    }
  }, [ServerUrl]); 
  // <- dependency: agar ServerUrl badlega tabhi function dobara banega

  // 4) Component mount hone ke baad current user data ek baar laate hain
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]); 
  // <- ab warning nahi aayegi kyunki getCurrentUser ka reference stable hai

  // 5) Value object banate hain jo context ke saath share hoga
  const value = {
    UserData,
    SetUserData,
    getCurrentUser
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
