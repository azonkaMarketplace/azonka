import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import queryString from "query-string";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ErrorAlert from "../../common/ErrorAlert";
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

class VerifyEmail extends Component {
    state = {
        passcode: '',
        userDetails:{},
        showSpinner: false
    }
    componentDidMount(){
        const query = queryString.parse(this.props.location.search)
        const userRegDetails = JSON.parse(localStorage.getItem('userRegDetails'))
        if(!query || !userRegDetails){
            return this.props.history.push('/users/login')
        }

        if(query['passcode']){
            this.setState({
                passcode: query['passcode'],
                userDetails: userRegDetails
            })
        }
        
    }
    resendEmailPasscode = (e) => {
        const {add} = this.props.toastManager;
        //call database emailAddress
        console.log('e', JSON.parse(localStorage.getItem('userRegDetails')).emailAddress)
        this.props.resendEmail(JSON.parse(localStorage.getItem('userRegDetails')).emailAddress)
        add('Successful, Please check your mail to continue', { appearance: 'success' })
    }
    verifyEmail = e => {
        e.preventDefault()
        const {add} = this.props.toastManager;
        if(this.state.passcode.trim() === ''){
            return add('Please provide passcode', { appearance: 'error' })
        }
        //call the api
        this.props.initiateRegistration()
        this.props.verifyEmail({
            emailAddress: JSON.parse(localStorage.getItem('userRegDetails')).emailAddress,
            emailProofToken: this.state.passcode,
            password: JSON.parse(localStorage.getItem('userRegDetails')).password
        })
        //if result is successful, move the user to set up security questions
        
    }
    closeSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    handleOnChange = e => {
        const {target: { name, value, size}} = e;
        if(value.length <= parseInt(size, 10) ){
           return this.setState({
                [name]: value
            })
        }
        
    }
    closeSnackBar = () => {
        this.props.initiateRegistration()
    }
    render() {
        return (
            <div className="form-popup">
                <div className="form-popup-content">
                    <h4 className="popup-title verify-email">Verify Email</h4>
                    <hr className="line-separator"/>
                    <form id="register-form" noValidate>
                        <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                            <input type="text" value={this.state.passcode}
                                size={6} name="passcode" onChange={this.handleOnChange} className="one-time-pwd-input" placeholder="Enter Passcode"/>
                        </div>
                        
                        <div className="otp-container">
                            <span style={{fontSize: 40}}>
                                <i className="fas fa-user-lock"></i>
                            </span>
                        </div>
                        <div className="resend-otp-container center-content">
                            <span className="resend-otp" onClick={this.resendEmailPasscode}>Resend Passcode?</span>
                        </div>
                        <div className="right-content">
                            <button className="button mid secondary" onClick={this.verifyEmail}>Verify</button>
                        </div>
                    </form>
                </div>
                <ErrorAlert open={this.props.error} closeSnackBar={this.closeSnackBar} errorMessage={this.props.errorMessage} />
                {
                    this.props.redirectToProfile ? <Redirect to="/users/profile" /> : null
                }
                {
                    this.props.redirectToLogin ? <Redirect to="/users/login" /> : null
                }
                {
                    this.props.loading ? <div className="spinner"><CircularProgress /></div> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: { loading,redirectToProfile,redirectToLogin, error, errorMessage}} = state;
    return {
        loading,
        error,
        errorMessage,
        redirectToProfile,
        redirectToLogin 
    }
}

export default connect(mapStateToProps, actions)(withToastManager(VerifyEmail))