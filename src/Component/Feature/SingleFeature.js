import React, { useState } from 'react';
import './SingleFeature.css'

const SingleFeature = (props) => {

   const {name, details, image} = props.feature;
   const [descriptionCollapse, setDescriptionCollapse] = useState(false);

   // To Get ShowMore and ShowLess Button Operation
   const showMore = () => {
      setDescriptionCollapse(true);
   }
   const showLess = () => {
      setDescriptionCollapse(false);
   }

   return (
      <div className="col-md-4">
         <div className="card">
               <img className="card-img-top" src={image} alt=""/>
            <div className="card-body">
               <div>
                  
                  <div className="d-flex">
                     <span></span>
                     <h5> {name} </h5>
                  </div>
                  <p> 
                     {
                        descriptionCollapse ? details : details.substr(0,80)+('....')
                     }
                  </p>
                  {
                     descriptionCollapse ? 
                     <span onClick={showLess} className="card-link collapse-btn">See Less <i class="fas fa-arrow-circle-left"></i></span>
                     :
                     <span onClick={showMore} className="card-link collapse-btn">See More <i class="fas fa-arrow-circle-right"></i></span>
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default SingleFeature;