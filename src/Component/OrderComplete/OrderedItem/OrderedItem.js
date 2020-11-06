import React from 'react';
import './OrderedItem.css'

const OrderedItem = (props) => {
   const d = new Date( props.foodDetails.createdAt );
   const date = d.toDateString();
   // const bookingDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`;

   return (
      <div className="card orderList p-3 my-5">
         <div className='row heading'>
            <h6 className="col-md-6"> <b>Ordered On: </b> {date} </h6>
            <h6 className="col-md-6"> <b>Order ID: </b> {props.foodDetails._id} </h6>
         </div>
         <div className="row">
         {
            props.foodDetails && props.foodDetails.foods.map(cartFood => {
               const {_id, name, price, image, quantity} = cartFood
               return(
               
                  <div className="col-md-6 align-items-center">
                     <div className="cartFood">
                     <div className="col-5">
                        <img className="img-fluid" src={image} alt=""/>
                     </div>
                     <div className="col-7">
                        <p> {name} </p>
                        <h5> ${price} </h5>
                        <p> Quantity: {quantity} </p>
                     </div>
                     </div>
                  </div>
               
               )
            })
         }
         </div>
      </div>
   );
};

export default OrderedItem;