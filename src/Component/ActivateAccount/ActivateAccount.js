import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import './ActivateAccount.css'
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';

const ActivateAccount = ({setHeaderFooter}) => {
   useEffect(() => {
      setHeaderFooter(false)
   }, [])
   
   const {formLoader, setFormLoader,toastMessage} = useContextData()
   const {signUpWithEmailAndPassword} = FirebaseHandler()
   const {dataToken} = useParams()

   const activateHandler = async () => {
      if (dataToken) {
         setFormLoader(true)
         signUpWithEmailAndPassword(dataToken)
      }
   }

   return (
      <div className="container accountActivationPage">
         {toastMessage()}
         <div className="accountActiveDiv">
            {/* {
               formLoader && <FormLoading />
            } */}
            <div className='accountActive' elevation={3}>
               <h4>Please Click Activate Button To Activate Your Account</h4>
               <button 
                  className='activeBtn' 
                  type="submit" 
                  variant="contained"
                  onClick={activateHandler}
               >
                  Activate Account
               </button>
            </div>
         </div>
      </div>
   );
};

export default ActivateAccount;