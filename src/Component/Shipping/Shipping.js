import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipping.css'
import Products from './Products';
import { Link, useHistory } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';


const Shipping = () => {
   const history = useHistory()
   const {cart, placeOrder} = useContextData()
   const [formData, setFormData] = useState()
   const { register, handleSubmit, watch, errors } = useForm()
   const onSubmit = data => setFormData(data);

   // To Get All Food Price Calculation
   const totalPd = cart && cart.map(food => food.price * food.quantity)
   const total = totalPd && 
   totalPd.reduce((accumulator, currentValue) => accumulator+currentValue, 0)
   const tax = parseFloat((total * 5)/100)

   // Place Order
   const [isSuccess, setIsSuccess] = useState(false);
   if(isSuccess){
       setTimeout(() => setIsSuccess(false), 5000)
    }

   const cost = {itemPrice:total, total:total + tax, tax}
   const submitOrder = (foods) => {
      formData.totalItems = foods
      formData.totalCost = cost
      placeOrder(formData, history)
   }


   return (
      <div className='container'>
         <div className='row'>
            <div className="col-md-6 py-5 px-3 px-md-5 px-lg-5">
               <form onSubmit={handleSubmit(onSubmit)} className="px-3">
                  <h4 className="heading">Delivery Details</h4>
                  <input className="form-control" name="name" placeholder="Full Name" ref={register({ required: true })} />
                  {errors.name && <span className="error">Name is required</span>}

                  <input className="form-control" name="email" placeholder="Email" ref={register({ required: true })} />
                  {errors.email && <span className="error">Email is required</span>}

                  <input className="form-control" name="phone" placeholder="Contact Number" type="number" ref={register({ required: true })} />
                  {errors.phone && <span className="error">Phone is required</span>}

                  <input className="form-control" name="city" placeholder="City" ref={register({ required: true })} />
                  {errors.city && <span className="error">City is required</span>}

                  <input className="form-control" name="address" placeholder="Address" ref={register({ required: true })} />
                  {errors.address && <span className="error">Address is required</span>}

                  <input className="form-control" name="zipCode" placeholder="Zip Code" type="number" ref={register({ required: true })} />
                  {errors.zipCode && <span className="error">Zip-Code is required</span>}
                  <button 
                     type="submit"
                     className="form-control submitBtn" 
                  >
                     Submit & Continue
                  </button>
               </form>
            </div>
            <div className=" col-md-6 py-5 px-3 px-md-5 px-lg-5">
               {
                  cart && cart.length ? 
                  <Products></Products> : 
                  <div className="heading">
                     <h4>You haven't added any food</h4>
                     <Link to="/"><p>Please Continue Shopping</p></Link>
                  </div>
               }
               <div className="">
                  <div className="d-flex row">
                     <div className="col-md-6">
                        <h5>Total Ordered Food</h5>
                     </div>
                     <div className="text-right col-md-6">
                        <h5> {cart && cart.length} Piece </h5>
                     </div>
                  </div>
                  <div className="d-flex row">
                     <div className="col-md-6">
                        <h5>Total Food Price</h5>
                     </div>
                     <div className="text-right col-md-6">
                        <h5>$ {total} </h5>
                     </div>
                  </div>
                  <div className="d-flex row">
                     <div className="col-md-6">
                        <h5>Tax & Vat</h5>
                     </div>
                     <div className="text-right col-md-6">
                        <h5>$ {tax.toFixed(2)} </h5>
                     </div>
                  </div>
                  <div className="d-flex row">
                     <div className="col-md-6">
                        <h5>Total Amount</h5>
                     </div>
                     <div className="text-right col-md-6">
                        <h5>$ {(total + tax).toFixed(2)} </h5>
                     </div>
                  </div>
                  {
                     cart && cart.length && formData ? 
                     <button 
                        className="order" 
                        onClick={() => submitOrder(cart)} 
                        style={{backgroundColor: "#ff2e5e"}}
                     >
                        Place Order
                     </button> : 
                     <button className="order" disabled>
                        Place Order
                     </button>
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default Shipping;