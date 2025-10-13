import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from 'axios'
import { UserDataContext } from "./UserContext";

export const shopDataContext = createContext()

function ShopContext({children}) {

    let [products,setProducts] = useState([])
    let [search,setSearch] = useState('')
    let [showSearch,setShowSearch] = useState(false)
    let [cartItem,setCartItem] = useState({})
    let {ServerUrl} = useContext(authDataContext)
    let {UserData} = useContext(UserDataContext)
    let currency = '₹';
    let delivery_fee = 10;

    const getProducts =useCallback( async () => {
        try {
            let result = await axios.get(ServerUrl+'/api/product/list')
            console.log(result.data)
            setProducts(result.data)
        } catch (error) {
         console.log(error)   
        }
    },[ServerUrl])

    const addtocart = async (itemId,size) => {
        if (!size) {
            console.log('Select Product Size')
            return;
        }

        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1;
            } else{
                cartData[itemId][size] =1;
            }
        } else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItem(cartData)
      
        if (UserData) {
            try {
            let result = await axios.post(ServerUrl+'/api/cart/add',{itemId,size},{withCredentials:true})
            console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('Add error')
        }

        
    }

    const getUsarCart = useCallback(async () => {
            try {
                const result = await axios.post(ServerUrl + '/api/cart/get',{},{withCredentials:true})
                setCartItem(result.data)
            } catch (error) {
                console.log(error)
            }
        },[ServerUrl])


    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity
        setCartItem(cartData)


        if (UserData) {
        try {
            await axios.post(ServerUrl+'/api/cart/update',{itemId,size,quantity},{withCredentials:true})
        } catch (error) {
            console.log(error)
        }
    }

    }    




    const getCartCount=()=>{
        let totalCount = 0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if (cartItem[items][item]>0) {
                        totalCount+=cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((product)=>product._id ===items);
            for(const item in cartItem[items]){
                try {
                    if (cartItem[items][item]>0) {
                        totalAmount += itemInfo.price*cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

    useEffect(()=>{
        getProducts()
    },[getProducts])

   useEffect(()=>{
    getUsarCart()
   },[getUsarCart])

    let value={
        products,currency,delivery_fee,getProducts,search,setSearch,showSearch,setShowSearch,cartItem,addtocart,getCartCount,setCartItem,updateQuantity,getCartAmount
    }
    return(
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    )
}

export default ShopContext
