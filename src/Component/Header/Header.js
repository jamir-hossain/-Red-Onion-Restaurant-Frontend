import React from 'react';
import logo from '../../images/logo2.png'
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../SignIn and SignUp/useAuth';


const Header = () => {
   const auth = useAuth()
   const cartFood = auth.userData && auth.userData.cartFood


   return (
      <div className="header">
         <nav className="navbar navbar-expand navbar-light bg-white py-0 fixed-top">
            <div className="container">
               <Link to="/" className="navbar-brand">
                  <img src={logo} alt="Hot Onion Logo"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                  <li className="nav-item active cart">
                     <Link to="/shipping" className="nav-link"><i class="fas fa-shopping-cart cart-icon"></i><span className="badge bg-light"> {cartFood && cartFood.length} </span></Link>
                  </li>
                  <li className="nav-item">
                     {
                        auth.user ?  
                        <Link to="/order-complete" className="nav-link" style={{color:'black'}}>{auth.user.name}</Link> 
                        :
                        <Link to="/login" className="nav-link">Login</Link> 
                     }
                  </li>
                  <li className="nav-item">
                     {
                        auth.user ? 
                        <Link to="/" className="nav-link">
                           <button onClick={() => {auth.signOut()}} className="btn btn-danger btn-rounded">Sign Out</button>
                        </Link>
                        :
                        <Link to="/signup" className="nav-link">
                           <button className="btn btn-danger btn-rounded">Sign Up</button>
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