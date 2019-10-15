import React from 'react';
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({component: Component, ...rest}) => {
    const user = localStorage.getItem('azonta-user')
    if(user){
        // const decodedToken = jwtDecode(token)
        // if(decodedToken.exp * 1000 < Date.now()){
        //     return <Redirect to="/login" />
        // }
        return <Route {...rest} component={Component} />
    }
    return (
        <Redirect to="/users/login" />
    );
};

export default AuthRoute;