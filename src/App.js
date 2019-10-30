import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import AWS from "aws-sdk";
import { endpoint, secretAccessKey, accessKeyId, agentBucketID } from "./config/config";
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
import NotFoundRoute from "./components/Auth/NotFoundRoute";
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

import AgentSignUp from "./components/AgentSignUp";
import SellerSignUp from "./components/SellerSignUp";

import Reducer from './reducers';
import ResetPassword from './components/Auth/ResetPassword';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)



class App extends Component {
  componentDidMount(){
    const spacesEndpoint = new AWS.Endpoint(endpoint);

    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId,
        secretAccessKey
    });

    s3.createBucket({ Bucket: agentBucketID }, function (err, data) {
      if (!err) {
          console.log('datat o', data);
      } else {
          console.log('errror', err)
      }
    })
  }
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
                    <AuthRoute redirectIfUser exact path="/users/create-store" component={CreateStore} />
                    <AuthRoute  exact path="/users/buycredit" component={BuyCredit} />
                    <AuthRoute redirectIfUser exact path="/users/sales" component={Sales} />
                    <AuthRoute redirectIfUser exact path="/users/commissions" component={Commission} />
                    <AuthRoute redirectIfUser exact path="/users/withdrawal" component={WithDrawal} />
                    <AuthRoute redirectIfUser exact path="/users/items/upload" component={UploadItem} />
                    <AuthRoute redirectIfUser exact path="/users/items/manage" component={ManageItems} />
                    <AuthRoute redirectIfUser exact path="/users/:id/referals" component={Referral} />
                    <AuthRoute exact path="/users/banks" component={Bank} />
                    <AuthRoute exact path="/users/agent/signup" component={AgentSignUp} />
                    <AuthRoute exact path="/users/seller/signup" component={SellerSignUp} />
                    <AuthRoute noAuthRequired  path="/users/wishlist" component={WishList} />
                    <AuthRoute redirectIfAuth noAuthRequired exact = "/password/new" component={ResetPassword} />
                    <NotFoundRoute path="*" component={Home} />
                </Switch>
                <Footer />
            </Router>
          </Provider>

        </div>
      </ToastProvider>
    );
  }
}

;

export  {App};
