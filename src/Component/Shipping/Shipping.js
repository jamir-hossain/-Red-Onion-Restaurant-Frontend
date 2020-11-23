import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipping.css'
import Products from './Products';
import { Link } from 'react-router-dom';
import { useAuth } from '../SignIn and SignUp/useAuth';


const Shipping = () => {
   const auth = useAuth()
   const cartFood = auth.userData && auth.userData.cartFood
   
   // To Get User Information From user form
   const [formData, setFormData] = useState()
   const { register, handleSubmit, watch, errors } = useForm()
   const onSubmit = data => setFormData(data);

   // To Get All Food Price Calculation
   const totalPd = auth.user && auth.cart.map( food => food.price * food.quantity)
   const total = totalPd && totalPd.reduce( (defaultValue, price) => defaultValue+price, 0)
   const tax = parseFloat((total * 5)/100)

   // Place Order
   const [isSuccess, setIsSuccess] = useState(false);
   if(isSuccess){
       setTimeout(() => setIsSuccess(false), 5000)
    }

   const totalItem = auth.user && auth.cart.length
   const cost = {totalItem, itemPrice:total, total:total + tax, tax}
   const [success, setSuccess] = useState();
   const placeOrder = (foods) => {
      fetch('https://red-onion-backend-server.herokuapp.com/place-order', {
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('auth-token')
         },
         body:JSON.stringify({user:auth.user, shipping:formData, foods, cost})
      })
      .then(res => res.json())
      .then(result => {
         setSuccess(result)
         setIsSuccess(true)
         window.location.pathname = "/order-complete"
      })
   }


   return (
      <div className='container'>
         <div className='row'>
            <div className="col-md-6">
               <div className="shippingForm">
                  <form onSubmit={handleSubmit(onSubmit)} className="py-5">
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
                     {
                        cartFood && cartFood.length ? <button className="form-control submitBtn" type="submit" >Submit & Continue</button> : <button className="order" disabled>Place Order</button>
                     }
                  </form>
               </div>
            </div>

            <div className=" col-md-6">
               <div className="shippingProduct">
                  {
                     cartFood && cartFood.length ? <Products></Products> : <div className="heading">
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
                           <h5> {auth.user && auth.cart.length} Piece </h5>
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
                        cartFood && cartFood.length && formData ? <button onClick={() => placeOrder(auth.cart)} className="order" style={{backgroundColor: "#ff2e5e"}}>Place Order</button> : <button className="order" disabled>Place Order</button>
                     }
                     {success &&
                        <h3 className="ml-3 success-mgs text-success"> {success.error ? success.error : success.success && success.success} </h3>
                     }
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Shipping;