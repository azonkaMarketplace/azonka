import React, { Component } from 'react';
import Zoom from "react-reveal/Zoom";
class Register extends Component {
    state = {
        extendedUserType: 'buyer'
    }
    extendedUserTypeChange = (event, value) => {
        console.log('value', event.target.value)
        this.setState({
            extendedUserType: value
        })
    }
    render() {
        return (
            <div className="form-popup">
                <div className="form-popup-content">
					<h4 className="popup-title">Register Account</h4>
					<hr className="line-separator"/>
					<form id="register-form">
						<label htmlFor="email_address2" className="rl-label required">Email Address</label>
						<input type="email" id="email_address2" name="email_address2" placeholder="Enter your email address here..."/>
                        <label htmlFor="phoneNumber" className="rl-label required">Phone Number</label>
						<input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your hone number..."/>
                        <label htmlFor="ReferralCode" className="rl-label">Referral Code</label>
						<input type="text" id="ReferralCode" name="ReferralCode" placeholder="Enter your referral code..." />
						<label htmlFor="password2" className="rl-label required">Password</label>
						<input type="password" id="password2" name="password2" placeholder="Enter your password here..."/>
						<label htmlFor="repeat_password2" className="rl-label required">Repeat Password</label>
						<input type="password" id="repeat_password2" name="repeat_password2" placeholder="Repeat your password here..."/>
                        
                        <div>
                            <input type="radio" id="agent" name="extenedUserType"
                             value="agent" checked={this.state.extendedUserType === 'buyer'} onChange={this.extendedUserTypeChange} />
                            <label  className="label-check" onClick={(event) => this.extendedUserTypeChange(event, 'buyer')}>
                                <span className="checkbox primary primary"><span></span></span>
                                I want to Buy
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="agent" name="extenedUserType"
                             value="agent" checked={this.state.extendedUserType === 'agent'} onChange={this.extendedUserTypeChange} />
                            <label  className="label-check" onClick={(event) => this.extendedUserTypeChange(event, 'agent')}>
                                <span className="checkbox primary primary"><span></span></span>
                                I want to be an agent
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="seller" 
                                name="extenedUserType" value="sellers"
                                     onChange={(event) => this.extendedUserTypeChange(event)} checked={this.state.extendedUserType === 'sellers'} />
                            <label  className="label-check" onClick={(event) => this.extendedUserTypeChange(event, 'sellers')}>
                                <span className="checkbox primary primary"><span></span></span>
                                I want to sell
                            </label>
                        </div>
                        {
                            this.state.extendedUserType === 'sellers' ? (
                                <Zoom bottom>
                                    <div className="container-fluid" style={{paddingLeft: 0, paddingRight: 0}}>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 shopLocationContainer">
                                                <label htmlFor="shopLocation" className="rl-label required">Shop Location</label>
                                                <select id="inputState">
                                                    <option selected>Choose...</option>
                                                    <option value="Lagos">Lagos</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6" >
                                                <label htmlFor="shopAddress" className="rl-label required">Head Office Address</label>
                                                <input type="text" name="shopAddress"  placeholder="Contact Address..." />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                <label htmlFor="contactLine" className="rl-label required">Contact Line</label>
                                                <input type="text" name="contactLine"  placeholder="Contact Line..." />
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                            ) : null
                        }
						<button className="button mid dark">Register <span className="primary">Now!</span></button>
					</form>
				</div>
            </div>
        );
    }
}

export default Register;