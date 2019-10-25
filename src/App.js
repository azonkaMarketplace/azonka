import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import  "@fortawesome/fontawesome-free/css/all.css";
import  "./css/style.css";

import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
import Home from "./components/Home";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Referral from "./components/Referrals";
import SecurityQuestion from "./components/Auth/SecurityQuestion";


import AuthRoute from "./components/Auth/AuthRoute";
import { ToastProvider} from 'react-toast-notifications'
//Banners

import Profile from "./components/Profile";
import AccountSetting from "./components/AccountSetting";
import Purchases from "./components/Purchases";
import Cart from "./components/Cart";
import BuyCredit from "./components/BuyCredit";
import Sales from "./components/Sales";
import ManageItems from "./components/ManageItems";
import Commission from "./components/Commission";
import WithDrawal from "./components/WithDrawal";
import UploadItem from "./components/UploadItem";
import CreateStore from "./components/CreateStore";
import Bank from "./components/Bank";
import WishList from "./components/WishList";

import Reducer from './reducers';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

class App extends Component {
  render(){
    return (
      <ToastProvider>
        <div className="">
          <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute redirectIfAuth noAuthRequired exact path="/users/register" component={Register} />
                    <AuthRoute redirectIfAuth  exact path="/users/verify" component={VerifyEmail} />
                    <AuthRoute redirectIfAuth noAuthRequired exact path="/users/login" component={Login} />
                    <AuthRoute redirectIfAuth exact path="/users/securityquestions" component={SecurityQuestion} />
                    <AuthRoute exact path="/users/profile" component={Profile} />
                    <AuthRoute exact path="/users/profile/account" component={AccountSetting} />
                    <AuthRoute noAuthRequired exact path="/users/purchases" component={Purchases} />
                    <AuthRoute noAuthRequired exact path="/users/cart" component={Cart} />
                    <AuthRoute exact path="/users/create-store" component={CreateStore} />
                    <AuthRoute exact path="/users/buycredit" component={BuyCredit} />
                    <AuthRoute exact path="/users/sales" component={Sales} />
                    <AuthRoute exact path="/users/commissions" component={Commission} />
                    <AuthRoute exact path="/users/withdrawal" component={WithDrawal} />
                    <AuthRoute exact path="/users/items/upload" component={UploadItem} />
                    <AuthRoute exact path="/users/items/manage" component={ManageItems} />
                    <AuthRoute exact path="/users/:id/referals" component={Referral} />
                    <AuthRoute exact path="/users/:id/banks" component={Bank} />
                    <AuthRoute noAuthRequired  path="/users/wishlist" component={WishList} />
                </Switch>
                <Footer />
            </Router>
          </Provider>

        </div>
      </ToastProvider>
    );
  }
}

export default App;
