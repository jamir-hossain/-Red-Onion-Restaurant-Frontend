import React, { useState } from 'react';
import { useAuth } from '../SignIn and SignUp/useAuth';
import './Products.css'


const Products = () => {
   const auth = useAuth()

   // Add Quantity
   const addQuantity = (foodId, quantity) => {
      fetch('https://red-onion-backend-server.herokuapp.com/add-and-remove-quantity', {
         method:"put",
         headers:{
            'Content-type':'application/json',
            'Authorization':localStorage.getItem('auth-token')
         },
         body:JSON.stringify({foodId, quantity})
      })
      .then(res => res.json())
      .then(result => {
         const updatedFood = auth.cart.map(food => {
            if (food._id === result._id) {
               return result
            }else{
               return food
            }
         })
         auth.setCart(updatedFood)
      })
   }

   // Remove Quantity
   const removeQuantity = (foodId, quantity) => {
      fetch('https://red-onion-backend-server.herokuapp.com/add-and-remove-quantity', {
         method:"put",
         headers:{
            'Content-type':'application/json',
            'Authorization':localStorage.getItem('auth-token')
         },
         body:JSON.stringify({foodId, quantity})
      })
      .then(res => res.json())
      .then(result => {
         const updatedFood = auth.cart.map(food => {
            if (food._id === result._id) {
               return result
            }else{
               return food
            }
         })
         auth.setCart(updatedFood)
      })
   }

   // deleteCartFoodHandler
   const deleteCartFoodHandler = (foodId) => {
      fetch('https://red-onion-backend-server.herokuapp.com/remove-cart-food', {
         method:"delete",
         headers:{
            'Content-type':'application/json',
            'Authorization':localStorage.getItem('auth-token')
         },
         body:JSON.stringify({foodId})
      })
      .then(res => res.json())
      .then(result => {
         const deletedFood = auth.user && auth.cart.filter(food => {
            return food._id !== result._id
         })
         auth.setCart(deletedFood)
         if (result) {
            fetch('https://red-onion-backend-server.herokuapp.com/get-user', {
               method:'GET',
               headers:{
                  'Content-Type':'application/json',
                  'Authorization':localStorage.getItem('auth-token')
               }
            })
            .then(res => res.json())
            .then(result => {
               auth.setUserData({...result})
            })
         }
      })
   }

   
   return (
      <div>
         <h4 className="heading">Your Selected Food</h4>
         {
            auth.user && auth.cart.map(cartFood => {
               const {_id, name, price, image, quantity} = cartFood
               return(
               <div className="cartFood row align-items-center">
                  <div className="img">
                     <img className="img-fluid" src={image} alt=""/>
                  </div>
                  <div className="name">
                     <p> {name} </p>
                     <h5> ${price} </h5>
                     <p>Delivery Free</p>
                  </div>
                  <div>
                     <button className="delete" onClick={()=> deleteCartFoodHandler(_id)}><i class="fas fa-trash"></i></button>
                  </div>
                  <div className="btnDiv">
                     <button onClick={() => {quantity > 1 && removeQuantity(_id, parseFloat(quantity)-1)}}>-</button>
                     <span className="quantity">{quantity}</span>
                     <button onClick={() => addQuantity(_id, parseFloat(quantity)+1)}>+</button>
                  </div>
               </div>
               )
            })
         }
      </div>
   );
};

export default Products;