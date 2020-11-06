import React from 'react';
import './AllFoods.css'
import { Link } from 'react-router-dom';

const AllFood = (props) => {
   const {name, subName, image, price, key} = props.foods
   return (
      <div className="col-md-4">
         <Link to={"/food/"+key} className="linkS">
            <div className="foods">
               <img className="img-fluid" src={image} alt=""/>
               <div className='details'>
                  <h5> {name} </h5>
                  <p> {subName} </p>
                  <h4> Price: ${price} </h4>
               </div>
            </div>
         </Link>
      </div>
   );
};

export default AllFood;