import React, { useState, useEffect } from 'react';
import foodData from '../../foodData/foodData'
import AllFood from './AllFood';
import './FoodData.css'
import { Link } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';

const FoodData = () => {
   const {cart} = useContextData()

   const [data, setData] = useState(foodData)
   const [category, setCategory] = useState("breakfast")
   const selectedFoods = data.filter( food => food.category === category)

   return (
      <div className='container'>
         <div className="buttonDiv">
            <button className={category === "breakfast" ? "button selectedBtn": "button"} onClick={() => setCategory("breakfast")}>Breakfast</button>
            <button className={category === "dinner" ? "button selectedBtn": "button"} onClick={() => setCategory("dinner")}>Dinner</button>
            <button className={category === "lunch" ? "button selectedBtn": "button"} onClick={() => setCategory("lunch")}>Lunch</button>
         </div>
         <div className="row">
            {
               selectedFoods.map( allData => <AllFood foods={allData}></AllFood>)
            }
         </div>
         <div className="text-center">
            {
               cart && cart.length ? <Link to="/shipping"><button className="checkoutBtn" style={{backgroundColor: "#dc3545", color:'white'}}>Checkout Your Food</button></Link>:
               <button className="checkoutBtn" disabled>Checkout Your Food</button>
            }
         </div>
      </div>
   );
};

export default FoodData;