import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import firebaseConfig from "../../firebaseConfig";
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import jwtDecode from "jwt-decode";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create Auth 
const AuthContext = createContext()
export const AuthContextProvider = (props) => {
   const auth = Auth()
   return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


const Auth = () => {
   const [user, setUser] = useState(null)

   const getUser = (data) => {
      const {displayName, email, photoURL} = data
      return {name:displayName, email, photo:photoURL}
   }

   // Sign In With Gmail
   const signInWithGmail = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then(result => {
         const signedUser = getUser(result.user)
         localStorage.setItem('user', JSON.stringify(signedUser))
         setUser(signedUser)
         window.history.back()
         return result.user
      })
      .catch(error => {
         return error.message
      })
   }

   // Sign Out
   const signOut = () => {
      return firebase.auth().signOut()
      .then(() => {
         setUser(null)
         localStorage.clear()
         window.location.reload()
      })
      .catch((error) => {
         console.log(error.message)
      });
   }

   // Manage Signed User 
   useEffect(() => {
      return firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           const savedUser = getUser(user)
           setUser(savedUser)
         } else {
           // No user is signed in.
         }
       });
   }, [])
   
   // Manage Signed User 
   const tokenUser = localStorage.getItem('auth-token')
   useEffect( () => {
      if (tokenUser) {
         const cartFood = tokenUser
         const decoded = jwtDecode(cartFood)
         setUser(decoded)
      }
   }, [tokenUser])

   // Get User
   const [userData, setUserData] = useState([])
   useEffect(() => {
      if (user) {
         fetch('http://localhost:3005/get-user', {
            method:'GET',
            headers:{
               'Content-Type':'application/json',
               'Authorization':localStorage.getItem('auth-token')
            }
         })
         .then(res => res.json())
         .then(result => {
            setUserData(result)
         })
      }
   }, [user])

   // Get All Food From Cart
   const [cart, setCart] = useState([])
   useEffect( () => {
      if (userData) {
         fetch('http://localhost:3005/get-cart-food', {
            method:'GET',
            headers:{
               'Content-Type':'application/json'
            }
         })
         .then(res => res.json())
         .then(result => {
            let userCart = userData && userData.cartFood
            if (result, userCart) {
               const res = result.filter(f => userCart.some(item => item === f._id));
               setCart(res);
            }
         }) 
      }
   }, [userData])

   // Clear Token From LocalStorage when expired
   const token = localStorage.getItem('auth-token')
   useEffect(() => {
      if (token) {
         const { exp } = jwtDecode(token)
         if (Date.now() <= exp * 1000) {
            console.log('Token Valid')
         }else{
            console.log('Token Expired')
            localStorage.removeItem('auth-token');
            window.location.pathname = "/"
         }
      }
   }, [token])



   return {
      cart,
      setCart,
      user,
      userData,
      setUserData,
      setUser,
      signInWithGmail,
      signOut
   }
}

export default Auth;