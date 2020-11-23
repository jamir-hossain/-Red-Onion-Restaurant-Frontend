import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/logo2.png';

const SignUp = () => {
   const history = useHistory()

   const [signUpResult, setSignUpResult] = useState()
   const { register, handleSubmit, watch, errors } = useForm();   
   const onSubmit = data => { 
      fetch('https://red-onion-backend-server.herokuapp.com/signup-user', {
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify({data})
      })
      .then(res => res.json())
      .then(result => {
         console.log(result)
         setSignUpResult(result)
         setIsSuccess(true)
         result.success && history.push('/login')
      })
   }

   const [isSuccess, setIsSuccess] = useState(false)
   if (isSuccess) {
      setTimeout(()=> setIsSuccess(false), 3000)
   }


   return (
      <div className="sign-up">
         <div className="logo2 text-center">
            <Link to="/">
                  <img src={Logo} alt=""/>
            </Link>
         </div>
         <div className="container">
         <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            <div className="form-group">
               <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
               {errors.name && <span className="error">Name is required</span>}
            </div>
            <div className="form-group">
               <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
               {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className="form-group">
               <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
               {errors.password && <span className="error">Password is required</span>}
            </div>
            <div className="form-group">
               <input type="password" name="confirm_password" className="form-control" ref={register({
               validate: (value) => value === watch('password')
               })} placeholder="Confirm Password" />
               {errors.confirm_password && <span className="error">Passwords don't match.</span>}
            </div>
            <div className="form-group">
               <button className="btn btn-danger btn-block"  type="submit">Sign Up</button>
               {isSuccess &&
                  <p className="ml-3 success-mgs text-success"> {signUpResult.error ? signUpResult.error : signUpResult.success && signUpResult.success} </p>
                  
               }
            </div>
            <div className="option text-center">
               <Link to='/login'><label>Already Have an Account</label></Link>
            </div>
         </form>
         </div>
      </div>
   );
};

export default SignUp;