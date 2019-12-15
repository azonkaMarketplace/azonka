import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider} from 'react-toast-notifications'
import * as actions from "../../actions";
import Spinner from "../../assets/spinner.svg";
import SweetAlert  from "react-bootstrap-sweetalert";

class Layout extends Component {
    logout = () => {
        this.props.logout()
        return <Redirect to="/users/login" />
    }
    redirectToVeriy = () => {
        return <Redirect to="/users/verify" />
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    renderLoadingSpinner = () => {
        if(this.props.loading){
            return (
                <div className="spinner">
                    <div className="spinner-container">
                        <img src={Spinner} alt="spinner loading" />
                    </div>
                </div>
            )
        }
        return null
    }
    hideAlert = () => {
        this.props.closeSnackBar()
    }
    render() {
        return (
            <ToastProvider>
                
                    {this.props.children}
               
                {
                    this.props.unAuthorized ? this.logout() : null
                }
                {
                    this.props.redirectToVerify ? this.redirectToVeriy() : null
                }
                {
                    this.props.redirectToProfile ? <Redirect to="/users/profile" /> : null
                }
                {
                    this.props.redirectToLogin ? <Redirect to="/users/login" /> : null
                }
                {this.renderLoadingSpinner()}
                {
                    this.props.error ? <SweetAlert 
                    title={this.props.errorMessage} 
                    danger
                    onConfirm={this.hideAlert} onCancel={this.hideAlert} 
                    /> : null
                }
                {
                    this.props.success ? <SweetAlert 
                    title={this.props.successMessage} 
                    success
                    onConfirm={this.hideAlert} onCancel={this.hideAlert} 
                    /> : null 

                }
            </ToastProvider>
        );
    }
}

const mapStateToProps = state => {
    const {reg:{unAuthorized, loading,redirectToProfile,redirectToLogin, redirectToVerify },
    home: {error, errorMessage, success, successMessage}} = state;
    return {
        unAuthorized,
        redirectToVerify,
        loading,
        redirectToProfile,
        redirectToLogin,
        errorMessage,
        error,
        success,
        successMessage
    }
}

export default connect(mapStateToProps, actions)(Layout)