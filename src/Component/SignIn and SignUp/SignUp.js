import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/logo2.png';
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';
import { useContextData } from '../ContextProvider/ContextProvider';
import CommonForm from './CommonForm';

const SignUp = () => {
   const {emailVerification} = FirebaseHandler()
   const {toastMessage, formLoader} = useContextData()

   const { register, handleSubmit, watch, errors } = useForm();   
   const onSubmit = data => { 
      emailVerification(data)
   }


   return (
      <div className="container row mx-auto">
         {toastMessage()}
         <div className="signUpSignIn col-md-5 mx-auto">
            <div className="logo2 text-center">
               <img className="img-fluid" src={Logo} alt=""/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
               <div className="form-group">
                  <input 
                     name="username" 
                     className="form-control" 
                     ref={register({ required: true })} 
                     placeholder="Name" 
                  />
                  {errors.name && <span className="error">
                     Name is required
                  </span>}
               </div>
               <div className="form-group">
                  <input 
                     name="email" 
                     className="form-control" 
                     ref={register({ required: true })} 
                     placeholder="Email"
                  />
                  {errors.email && <span className="error">
                     Email is required
                  </span>}
               </div>
               <div className="form-group">
                  <input 
                     type="password" 
                     name="password" 
                     className="form-control" 
                     ref={register({ required: true })} 
                     placeholder="Password" 
                  />
                  {errors.password && <span className="error">
                     Password is required
                  </span>}
               </div>
               <div className="form-group">
                  <input 
                     type="password" 
                     name="confirm_password" 
                     className="form-control" 
                     ref={register({
                        validate: (value) => value === watch('password')
                     })} 
                     placeholder="Confirm Password" 
                  />
                  {errors.confirm_password && <span className="error">
                     Passwords don't match.
                  </span>}
               </div>
               <div className="form-group pt-3">
                  <button 
                     className="btn btn-danger btn-block" 
                     type="submit"
                  >
                     Sign Up
                  </button>
               </div>
               <div className="option text-center">
                  <Link to='/login'>
                     <label>
                        Already Have an Account
                     </label>
                  </Link>
               </div>
            </form>
            <CommonForm />
         </div>
      </div>
   );
};

export default SignUp;