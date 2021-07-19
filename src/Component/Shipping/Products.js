import React, { useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import foodData from '../../foodData/foodData'
import './Products.css'
import CartHandler from '../ContextProvider/ActionHandler/CartHandler';


const Products = () => {
   const {cart} = useContextData()
   const {removeFromCartHandler, addQuantity, removeQuantity} = CartHandler()
   
   return (
      <div>
         <h4 className="heading">Your Selected Food</h4>
         {
            cart && cart.map(cartFood => {
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
                     <button 
                        className="delete" 
                        onClick={()=> removeFromCartHandler(_id)}
                     >
                        <i class="fas fa-trash"></i>
                     </button>
                  </div>
                  <div className="btnDiv">
                     <button 
                        onClick={() => {
                           quantity > 1 && 
                           removeQuantity(_id, parseFloat(quantity)-1)
                        }}
                     >-</button>
                     <span className="quantity">{quantity}</span>
                     <button 
                        onClick={() => addQuantity(_id, parseFloat(quantity)+1)}
                     >+</button>
                  </div>
               </div>
               )
            })
         }
      </div>
   );
};

export default Products;