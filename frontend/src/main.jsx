import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://pakistanmart-production.up.railway.app"; 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <UserContext>
      <ShopContext>
    <App />
    </ShopContext>
    </UserContext>
    </AuthContext>
  </BrowserRouter>
 
)
