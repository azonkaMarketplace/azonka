import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import queryString from "query-string";
import oneTimePassword from "../../images/oneTimePassword.PNG";

class VerifyEmail extends Component {
    state = {
        passcode: '',
        userDetails:{}
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
        //call database

        add('Successful, Please check your mail to continue', { appearance: 'success' })
    }
    verifyEmail = e => {
        e.preventDefault()
        const {add} = this.props.toastManager;
        if(this.state.passcode.trim() === ''){
            return add('Please provide passcode', { appearance: 'error' })
        }
        //call the api
        localStorage.removeItem('userRegDetails')
    }
    handleOnChange = e => {
        const {target: { name, value, size}} = e;
        if(value.length <= parseInt(size, 10) ){
           return this.setState({
                [name]: value
            })
        }
        
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
                                size={6} name="passcode" onChange={this.handleOnChange} className="one-time-pwd-input" placeholder="------"/>
                        </div>
                        
                        <div className="otp-container">
                            <span style={{fontSize: 40}}>
                                <i class="fas fa-user-lock"></i>
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
            </div>
        );
    }
}

export default withToastManager(VerifyEmail);