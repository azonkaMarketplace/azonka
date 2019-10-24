import React from 'react';
import { Redirect, Route } from "react-router-dom";
import Login from "./Login";

const AuthRoute = ({component: Component, noAuthRequired, redirectIfAuth, ...rest}) => {
    const user = localStorage.getItem('azonta-user')
    if(user){
        if(redirectIfAuth){
            return <Redirect {...rest} to="/users/profile"/>
        }
        return <Route {...rest} component={Component} />
    }
    console.log('am here o');
    const userRegDetails = localStorage.getItem('userRegDetails')
    return noAuthRequired || userRegDetails ? <Route {...rest} component={Component} /> : 
    <Redirect to="/users/login" {...rest} />
};

export default AuthRoute;