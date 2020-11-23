import React, { useEffect,useState } from 'react';
import Rider from '../../images/Group 1151.png';
import RiderHalmet from '../../images/Group 1152.png';
import { useAuth } from '../SignIn and SignUp/useAuth';
import OrderedItem from './OrderedItem/OrderedItem';
import { Link } from 'react-router-dom';


const OrderComplete = () => {
    const auth = useAuth();

    const [orderDetails, setOrderDetails] = useState();
    useEffect(() => {
        if (auth.user) {
            fetch('https://red-onion-backend-server.herokuapp.com/get_order_details', {
                method:'get',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':localStorage.getItem('auth-token')
                },
            })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    let orderDetails = result.filter(data => {
                        return data.userID === auth.user._id
                    })
                    setOrderDetails(orderDetails)
                }
            })
        }
    }, [auth.user])
    
    const [address, setAddress] = useState();
    useEffect(() => {
        if (orderDetails) {
            const Address = orderDetails.find(data => {
                return data.userID === auth.user._id
            })
            return setAddress(Address)
        }
    }, [orderDetails])

    
    return (
        <div className="container pt-5 my-5">
            <div className="row">
                <div className="col-md-8">
                    <h3 className='heading'>Your Order List</h3>
                    {   
                        orderDetails && orderDetails.length ? orderDetails.map(data => <OrderedItem foodDetails={data}></OrderedItem>) :
                        <div className="heading mt-5 py-5">
                            <h4>You haven't added any food</h4>
                            <Link to="/"><p>Please Continue Shopping</p></Link>
                        </div>
                    }
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img className="" src={Rider} alt=""/>
                        <div className="bg-white  rounded p-3 my-3">
                            <div>    
                                <h4>Your Location</h4>
                                {
                                address  ?
                                <div>
                                    <p><b>Name: </b>{address.name} </p>
                                    <p><b>Area: </b>{address.shippingAddress.address} </p>
                                    <p><b>City: </b>{address.shippingAddress.city} </p>
                                    <p><b>Zip Code: </b>{address.shippingAddress.zipCode} </p>
                                </div> 
                                : <p>Loading data ...</p>
                                } 
                            </div>
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