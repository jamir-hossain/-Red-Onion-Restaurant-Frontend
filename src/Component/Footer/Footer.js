import React from 'react';
import './Footer.css'
import WhiteLogo from '../../images/logo.png';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-dark py-3">
            <div className="container">
               <div className="row footer-top py-2">
                  <div className="col-md-6 mb-5">
                     <img src={WhiteLogo} alt="Hot Onion White Logo"/>
                  </div>
                  <div className="col-md-3">
                     <ul className="list-unstyled">
                           <li><Link className="link" to="/about">About Online Food</Link></li>
                           <li><Link className="link" to="/blog">Read Our Blog</Link></li>
                           <li><Link className="link" to="/login">Sign up to deliver</Link></li>
                           <li><Link className="link" to="/about">Add your restaurant</Link></li>
                     </ul>
                  </div>
                  <div className="col-md-3">
                     <ul className="list-unstyled">
                           <li><Link className="link" to="/help">Get Help</Link></li>
                           <li><Link className="link" to="/faq">Read FAQ</Link></li>
                           <li><Link className="link" to="/cities">View All Cities</Link></li>
                           <li><Link className="link" to="/nearme">Restaurants near me</Link></li>
                     </ul>
                  </div>
               </div>

               <div className="footer-bottom d-flex justify-content-between align-items-center">
                  <small className="text-secondary">Copyright &copy;  2020 Online Food </small>
                  <ul className="list-inline">
                     <li className="list-inline-item ml-3"><a className="link" href="#">Privacy Policy.</a></li>
                     <li className="list-inline-item  ml-3"><a className="link" href="#">Terms of Use</a></li>
                     <li className="list-inline-item  ml-3"><a className="link" href="#">Pricing</a></li>
                  </ul>
               </div>
            </div>
        </footer>
    );
};

export default Footer;