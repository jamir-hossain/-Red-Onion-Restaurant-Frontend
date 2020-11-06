import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthContextProvider } from './Component/SignIn and SignUp/useAuth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Header/Header';
import Banner from './Component/Banner/Banner';
import FoodData from './Component/Food/FoodData';
import FoodDetails from './Component/Food/FoodDetails';
import NotFound from './Component/NotFound/NotFound';
import Shipping from './Component/Shipping/Shipping';
import Feature from './Component/Feature/Feature';
import Footer from './Component/Footer/Footer';
import SignIn from './Component/SignIn and SignUp/SignIn';
import SignUp from './Component/SignIn and SignUp/SignUp';
import OrderComplete from './Component/OrderComplete/OrderComplete';


function App() {
  return (
    <div>
        <AuthContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path='/'>
              <Banner></Banner>
              <FoodData></FoodData>
              <Feature></Feature>
              <Footer></Footer>
            </Route>
            <Route path='/food/:foodKey'>
              <FoodDetails></FoodDetails>
            </Route>
            <Route path='/shipping'>
              <Shipping></Shipping>
            </Route>
            <Route path="/login">
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
            <Route path="/order-complete">
              <OrderComplete></OrderComplete>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
