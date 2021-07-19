import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';
import './CommonStyle.css'

const CommonForm = () => {
   const {signInWithGmail, signInWithFacebook} = FirebaseHandler()

   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      // history.replace(from)
      history.push(from)
   }

   return (
      <div className='pb-3'>
         <div className='row orOptionDiv'>
            <span className='orOption col-5'></span>
            <span className='col-2 text-center'>OR</span>
            <span className='orOption col-5'></span>
         </div>
         <div onClick={() => signInWithFacebook()} className="socialBox">
            <div className='facebookLogin'>
               <span>Continue With Facebook</span>
            </div>
         </div>
         <div onClick={() => signInWithGmail()} className="socialBox">
            <div className='googleLogin'>
               <span>Continue With Google</span>
            </div>
         </div>
      </div>
   );
};

export default CommonForm;