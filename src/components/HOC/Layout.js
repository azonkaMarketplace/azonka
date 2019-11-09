import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider} from 'react-toast-notifications'
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import * as actions from "../../actions";
import Spinner from "../../assets/spinner.svg";
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";

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
    render() {
        return (
            <ToastProvider>
                <Header />
                    <div className="router-container">
                        {this.props.children}
                    </div>
                <Footer />
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
                <ErrorAlert open={this.props.error} closeSnackBar={this.closeSnackBar} errorMessage={this.props.errorMessage} />
                <SuccessAlert open={this.props.success} closeSnackBar={this.closeSnackBar} message={this.props.successMessage} />
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