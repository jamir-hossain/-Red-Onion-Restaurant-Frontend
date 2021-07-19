import React from 'react';
import './App.css';
import { AuthContextProvider } from './Component/ContextProvider/ContextProvider';
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
import ActivateAccount from './Component/ActivateAccount/ActivateAccount';
import { useState } from 'react';


function App() {
  const [headerFooter, setHeaderFooter] = useState(true)
  return (
    <div>
        <AuthContextProvider>
        <Router>
          {headerFooter && <Header />}
          <Switch>
            <Route exact path='/'>
              <Banner />
              <FoodData />
              <Feature />
            </Route>
            <Route path='/food/:foodKey'>
              <FoodDetails />
            </Route>
            <Route path='/shipping'>
              <Shipping />
            </Route>
            <Route path="/login">
              <SignIn setHeaderFooter={setHeaderFooter} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/order-complete">
              <OrderComplete />
            </Route>
            <Route path="/complete-registration/:dataToken">
              <ActivateAccount setHeaderFooter={setHeaderFooter}/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          {headerFooter && <Footer />}
        </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
