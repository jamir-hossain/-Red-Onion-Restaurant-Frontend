import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../images/logo2.png';
import {Link} from 'react-router-dom';
import './Login.css'
import { useContextData } from '../ContextProvider/ContextProvider';
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';
import CommonForm from './CommonForm';


const SignIn = ({setHeaderFooter}) => {
   useEffect(() => {
      setHeaderFooter(true);
   }, [])
   const {user, toastMessage} = useContextData()
   const {signWithEmailAndPassword} = FirebaseHandler()

   const { register, handleSubmit, errors } = useForm();   
   const onSubmit = data => { 
      const {email, password} = data
      signWithEmailAndPassword(email, password)
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
                     name="email" 
                     type="email" 
                     className="form-control" 
                     ref={register({ required: true })} 
                     placeholder="Password" 
                  />
                  {errors.email && <span className="error">
                     Email is required
                  </span>}
               </div>
               <div className="form-group">
                  <input 
                     name="password" 
                     type="password" 
                     className="form-control" 
                     ref={register({ required: true })} 
                     placeholder="Password" 
                  />
                  {errors.password && <span className="error">
                     Password is required
                  </span>}
               </div>
               
               <div className="form-group pt-3">
                  <button 
                     className="btn btn-danger btn-block" 
                     type="submit"
                  >
                     Sign In
                  </button>
               </div>
               <div className="option text-center">
                  <Link to='/signup'>
                     <label>Create a new Account</label>
                  </Link>
               </div>
               
            </form>
            <CommonForm />
         </div>
      </div>
   );
};

export default SignIn;