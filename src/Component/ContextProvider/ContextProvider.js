import React, { useState, useEffect, createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import jwtDecode from "jwt-decode";
import axios from "axios"
import { isAuthenticated } from './ActionHandler/AuthHelper';


// Create Auth 
const AuthContext = createContext()
export const AuthContextProvider = (props) => {
   const auth = Auth()
   return <AuthContext.Provider value={auth}>
         {props.children}
      </AuthContext.Provider>
}
export const useContextData = () => useContext(AuthContext)


const Auth = () => {
   const url = "http://localhost:3005";
   const [formLoader, setFormLoader] = useState(false)
   const [cart, setCart] = useState([])
   const [user, setUser] = useState(null)
   const [orderData, setOrderData] = useState(null)
   console.log(orderData)
   const loggedInToken = isAuthenticated()
   const [message, setMessage] = useState(null)
   setTimeout( () => {
      setMessage(null)
   }, 4000)


   // Manage Signed User 
   useEffect(() => {
      const loggedUser = loggedInToken && jwtDecode(loggedInToken)
      setUser(loggedUser)
   }, [])
   
   // Cart handler
   useEffect(() => {
      const cartFood = JSON.parse(localStorage.getItem('cartFoods'));
      if (cartFood === null) {
         localStorage.setItem('cartFoods', JSON.stringify([]));
      } else {
         const savedProduct = JSON.parse(localStorage.getItem('cartFoods'));
         setCart(savedProduct)
      }
   }, [])

   // Place Order
   const placeOrder = async (formData, history) => {
      if (loggedInToken) {
         const {name, email, phone, city, address, zipCode, totalItems, totalCost} = formData
         const result = await axios.post(url+'/place-order', {
            name, 
            email, 
            phone, 
            city, 
            address, 
            zipCode, 
            totalItems, 
            totalCost
         }, {
            headers: {authorization: loggedInToken}
         })
         if (result.data.success) {
            const {orderComplete, success} = result.data
            setOrderData([orderComplete, ...orderData])
            toast.success(success)
            history.push('/order-complete')
            localStorage.removeItem('cartFoods')
            setCart([])
         } else {
            toast.error(result.data.error)
         }
      }
   }

   // Place Order
   useEffect(() => {
      if (loggedInToken) {
         axios.get(url+'/get/order/details', {
            headers: {authorization: loggedInToken}
         })
         .then(result => {
            if (!result.data.error) {
               const reversed = result.data.reverse()
               setOrderData(reversed)
            } else {
               toast.error(result.data.error)
            }
         })
      }
   }, [])
   

   // Show Toast Message in Our Component
   const toastMessage = () => {
      return <ToastContainer 
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
      />
   }


   return {
      cart,
      setCart,
      user,
      setUser,
      message,
      orderData,
      formLoader, 
      placeOrder,
      setFormLoader,
      toastMessage,
   }
}

export default Auth;