import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import foodData from '../../foodData/foodData'
import { useAuth } from '../SignIn and SignUp/useAuth';
import './FoodDetails.css'


const FoodDetails = () => {
   const auth = useAuth()

   const {foodKey} = useParams()
   const [food, setFood] = useState(foodData)
   const singleFood = food.find( data => data.key === foodKey)
   const {name, subName, details, image, price, key} = singleFood

   const [quantity, setQuantity] = useState(1);
   const [isSuccess, setIsSuccess] = useState(false);
   const [result, setResult] = useState(null)

   const finalCartHandler = (singleFood) => {
      singleFood.quantity = quantity;
      fetch('http://localhost:3005/addTo-cart', {
         method:"POST",
         headers:{
            'Content-type':'application/json',
            'Authorization':localStorage.getItem('auth-token')
         },
         body:JSON.stringify({singleFood})
      })
      .then(res => res.json())
      .then(result => {
         setResult(result)
         setIsSuccess(true);
         auth.setCart([...auth.cart, result])
         if (result) {
            fetch('http://localhost:3005/get-user', {
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


  if(isSuccess){
      setTimeout(() => setIsSuccess(false), 4000)
   }

   return (
      <div className="container d-flex">
         <div className="foodDetails">
            <h1> {name} </h1>
            <p> {details} </p>
            <div className="d-flex  my-4">
               <h2 className="price">${price.toFixed(2)}</h2>
               <div className="cart-controller ml-3 btn">
                     <button className="btn" onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button> {quantity} <button className="btn" onClick={() => setQuantity(quantity + 1)}>+</button>
               </div>
            </div>
            <div className="action d-flex align-items-center">
               <button className="btn btn-danger btn-rounded mb-2" onClick={()=>finalCartHandler(singleFood)}><i class="fas fa-shopping-cart"></i> Add</button>
               {isSuccess &&
                  <p className="ml-3 success-mgs text-success"> {result.error ? result.error : result.success && result.success} </p>
                  
               }
            </div>
         </div>
         <div className="img-fluid bigImg">
            <img src={image} alt=""/>
         </div>
      </div>
   );
};

export default FoodDetails;