import React, { useEffect,useState } from 'react';
import Rider from '../../images/Group 1151.png';
import RiderHalmet from '../../images/Group 1152.png';
import { useContextData } from '../ContextProvider/ContextProvider';
import OrderedItem from './OrderedItem/OrderedItem';
import { Link } from 'react-router-dom';


const OrderComplete = () => {
    const {orderData, user} = useContextData();
    
    return (
        <div className="container pt-5 my-5">
            <div className="row">
                <div className="col-md-8">
                    <h3 className='heading'>Your Order List</h3>
                    {   
                        orderData ? orderData.map(data => <OrderedItem foodDetails={data}></OrderedItem>) :
                        <div className="heading mt-5 py-5">
                            <h4>You haven't added any food</h4>
                            <Link to="/"><p>Please Continue Shopping</p></Link>
                        </div>
                    }
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img className="img-fluid" src={Rider} alt=""/>
                        <div className="bg-white  rounded p-3 my-3">
                            <div>
                                <h4>Shop Address</h4>
                                <p>Star Kabab and Restaura</p>
                            </div>
                        </div>
                        <h1>09:00</h1>
                        <p>Estimated Delivery</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-50 mr-2 my-n3" src={RiderHalmet} alt=""/>
                            <div>
                                <h6>Hamim</h6>
                                <p>Your Rider</p>
                            </div>
                        </div>

                        <button className="btn btn-block my-3 btn-danger">Contact</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;