import React from 'react';
import logo from '../../images/logo2.png'
import Logo2 from '../../images/Background (2).png'
import './Header.css'
import { Link } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import FirebaseHandler from '../ContextProvider/ActionHandler/FirebaseHandler';


const Header = () => {
   const {toastMessage, cart, user} = useContextData()
   console.log(user)
   const {signOut} = FirebaseHandler()

   return (
      <div className="header">
         {toastMessage()}
         <nav className="navbar navbar-expand navbar-light bg-white py-0 fixed-top Custom">
            <div className="container">
               <Link to="/" className="navbar-brand">
                  <img className="d-none d-md-block d-lg-block" src={logo} alt="Hot Onion Logo"/>
                  <img className="d-block d-md-none d-lg-none img-fluid" src={Logo2} alt="Hot Onion Logo"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                  <li className="nav-item active cart">
                     <Link to="/shipping" className="nav-link">
                        <i class="fas fa-shopping-cart cart-icon"></i>
                        <span className="badge bg-light"> 
                           {cart ? cart.length : 0} 
                        </span>
                     </Link>
                  </li>
                  <li className="nav-item">
                     {
                        user ? <>
                        {
                            user.picture ? 
                           <Link 
                              to="/order-complete" 
                              className="nav-link profileImg" 
                           >
                              <img className="img-fluid rounded-circle" src={user.picture} alt=""/>
                           </Link> :
                           <Link 
                              to="/order-complete" 
                              className="nav-link" 
                              style={{color:'black'}}
                           >
                              {user.name}
                           </Link> 
                        }
                        </>
                        :
                        <Link to="/login" className="nav-link">Login</Link> 
                     }
                  </li>
                  <li className="nav-item">
                     {
                        user ? 
                        <button 
                           onClick={() => signOut()}
                           className="btn btn-danger btn-rounded"
                        >
                           Sign Out
                        </button>
                        :
                        <Link to="/signup" className="nav-link">
                           <button className="btn btn-danger btn-rounded">
                              Sign Up
                           </button>
                        </Link>
                     }
                  </li>
               </ul>
            </div>
         </nav>
      </div>
   );
};

export default Header;