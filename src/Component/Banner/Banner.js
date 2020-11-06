import React, { useState } from 'react';
import './Banner.css'
import { Link } from 'react-router-dom';

const Banner = () => {
   const [searchValue , setSearchValue] = useState(null)
   const getSearchValue = event => setSearchValue(event.target.value);
   return (
      <div className="banner d-flex align-items-center text-center">
         <div className="container">
            <h1>Best Food Waiting For Your Belly</h1>

            <div className="search-box col-md-6 my-5 mx-auto">
               <input id="query" onChange={getSearchValue} type="text" className="form-control" placeholder="Search Food Item" />
               <Link>
                  <button onClick={() => window.scrollBy(0, 500)} className="btn btn-danger btn-rounded search-btn">Search</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Banner;