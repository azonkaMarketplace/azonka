import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import  "./css/style.css";

import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
import Home from "./components/Home";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { ToastProvider} from 'react-toast-notifications'
//Banners


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
                    <Route exact path="/users/register" component={Register} />
                    <Route exact path="/users/verify" component={VerifyEmail} />
                    <Route exact path="/users/login" component={Login} />
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
