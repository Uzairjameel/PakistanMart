import React, { createContext } from "react";
export const authDataContext = createContext();
let ServerUrl = (
  import.meta.env.VITE_API_URL ||
  "https://pakistanmart-production.up.railway.app"
).replace(/\/$/, "");
let value = {
  ServerUrl,
};
function AuthContext({ children }) {
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
