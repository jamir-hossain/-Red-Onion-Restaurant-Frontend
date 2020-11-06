import React, { useState, useEffect } from 'react';
import features from '../../foodData/features';
import SingleFeature from './SingleFeature';
import './Feature.css'

const Feature = () => {
   const [feature, setFeature] = useState([])
   useEffect( () => {
      return setFeature(features)
   }, [])
   return (
      <section className="features my-5">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="row">
                        <div className="col-md-6">
                        <h2>Why you choose us</h2>
                        <p className="mt-3 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sapiente eaque repellendus asperiores nisi! Architecto, praesentium eligendi consequatur inventore fuga eius totam officia adipisci. Nostrum quia soluta vel distinctio delectus!</p>
                        </div>
                  </div>
               </div>

               {
                  feature.map( singleFeature => <SingleFeature key={singleFeature.id} feature={singleFeature}></SingleFeature>)
               }
               
            </div>
         </div>
      </section>
   );
};

export default Feature;