import React, { useContext } from "react";
import Registration from "./pages/registration";
import Home from "./pages/Home";
import Login from "./pages/login";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./component/Nav";
import { UserDataContext } from "./context/UserContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./component/Ai";

function App() {
    let {UserData} = useContext(UserDataContext) 
    let location = useLocation()
    return(
        <>
        {UserData && <Nav/>}
        <Routes>

            <Route path='/login' element={UserData ?(<Navigate to={location.state?.from ||'/'}/>)
            :(<Login/>)
            }/>

            <Route path='/singup' element={UserData ?(<Navigate to={location.state?.from ||'/'}/>)
            :(<Registration/>)}/>

            <Route path='/' 
            element={UserData?<Home/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/about' 
            element={UserData?<About/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/collection' 
            element={UserData?<Collections/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/product' 
            element={UserData?<Product/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/contact' 
            element={UserData?<Contact/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/productdetail/:productId' 
            element={UserData?<ProductDetail/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/cart' 
            element={UserData?<Cart/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/placeorder' 
            element={UserData?<PlaceOrder/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path='/order' 
            element={UserData?<Order/>:<Navigate to='/login' state=
            {{from: location.pathname}}/>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Ai/>
        </>
    )
}

export default App