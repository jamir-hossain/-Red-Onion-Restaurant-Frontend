import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import foodData from '../../foodData/foodData';
import CartHandler from '../ContextProvider/ActionHandler/CartHandler';
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';
import { useContextData } from '../ContextProvider/ContextProvider';
import './FoodDetails.css'


const FoodDetails = () => {
   const {addToCartHandler} = CartHandler()
   const {foodKey} = useParams()
   const selectedFood = foodData.find( data => data.key === foodKey)
   const {name, subName, details, image, price, key} = selectedFood

   const [quantity, setQuantity] = useState(1);
   const [isSuccess, setIsSuccess] = useState(false);

   const addFoodOnCart = (selectedFood) => {
      selectedFood.quantity = quantity;
      setIsSuccess(true)
      addToCartHandler(selectedFood)
   }
   if(isSuccess){
      setTimeout(() => setIsSuccess(false), 4000)
   }

   return (
      <div className="container row mx-auto">
         <div className="col-md-6 foodDetails ordered-2">
            <h1 className="fooTitle"> {name} </h1>
            <p className="text-justify"> {details} </p>
            <div className="d-flex  my-4">
               <h2 className="price">${price.toFixed(2)}</h2>
               <div className="cart-controller ml-3 btn">
                  <button 
                     className="btn" 
                     onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                  >-</button> 
                     {quantity} 
                  <button 
                     className="btn" 
                     onClick={() => setQuantity(quantity + 1)}
                  >+</button>
               </div>
            </div>
            <div className="action d-flex align-items-center">
               <button 
                  className="btn btn-danger btn-rounded mb-2" 
                  onClick={()=>addFoodOnCart(selectedFood)}
               >
                  <i class="fas fa-shopping-cart"></i> Add
               </button>
               {isSuccess &&
                  <p className="ml-3 success-mgs text-success"> 
                     Product Is Successfully Added
                  </p>
               }
            </div>
         </div>
         <div className="col-md-6 pt-5 imgStyle">
            <img className="img-fluid" src={image} alt=""/>
         </div>
      </div>
   );
};

export default FoodDetails;