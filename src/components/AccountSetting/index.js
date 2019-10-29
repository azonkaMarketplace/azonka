import React, { Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import Validator from "validator";
import profileImage from "../../images/dashboard/profile-default-image.png";
import SuccessAlert from "../../common/SuccessAlert";
import ErrorAlert from "../../common/ErrorAlert";
import { connect } from "react-redux";

class index extends Component {
    state = {
        profileInformation: {},
        billingInformation: {},
        shippingInformation: {},
        copyToShip: false,
        showBalanceInStatusBar: true,
        sendEmails: true,
        inValidElements: []
    }
    componentDidMount(){
        this.props.switchActiveLink('account-setting')
    }
    static getDerivedStateFromProps(nextProps, state){
        const {user} = nextProps;
        if(user){
            const { firstName, lastName, emailAddress, phoneNumber} = user
            return {
                profileInformation: {
                    firstName,
                    lastName,
                    emailAddress,
                    phoneNumber,
                    ...state.profileInformation
                }
            }
        }
        return {...state}
    }
    handleInputChange = ({event, field}) => {
        const { target: {name, value}} = event;
        const index = this.state.inValidElements.findIndex(element => element.field === field && element.input === name)
        if(index !== -1){
            this.state.inValidElements.splice(index, 1)
        }
        this.setState({
            [field] : {...this.state[field], [name]: value},
            inValidElements: [...this.state.inValidElements]
        })
    }
    copyToShipInformation = (event) => {
        this.setState({
            copyToShip: !this.state.copyToShip
        }, () => {
            if(this.state.copyToShip){
                this.setState({
                    shippingInformation: {...this.state.billingInformation}
                })
            }
        })
    }
    toggleSendEmailNotification = (event) => {
        this.setState({
            sendEmails: !this.state.sendEmails
        })
    }
    toggleShowAccountBalance = (event) => {
        this.setState({
            showBalanceInStatusBar: !this.state.showBalanceInStatusBar
        })
    }
    validateProfileInformation = (data, field) => {
        let isValid = true
        let inValidElements = []
        if(!Validator.isEmail(data['emailAddress'])){
            isValid = false;
            inValidElements.push({field, input:'emailAddress'})
        }
        if(!/^[0-9]*$/.test(data['phoneNumber'])){
            isValid = false;
            inValidElements.push({field, input:'phoneNumber'})
        }
        if(data['firstName'].trim() === ''){
            isValid = false;
            inValidElements.push({field, input:'firstName'})
        }
        if(data['lastName'].trim() === ''){
            isValid = false;
            inValidElements.push({field, input:'lastName'})
        }
        if( data['newPassword'] && data['newPassword'].trim() !== ''){

            if( !data['new_pwd2'] || data['new_pwd2'].trim() === '' ){
                isValid = false
                inValidElements.push({field, input:'new_pwd2'})
            }
            if( !data['currentPassword'] || data['currentPassword'].trim() === ''){
                isValid = false
                inValidElements.push({field, input:'currentPassword'})
            }
        }
        return {
            isValid,
            inValidElements
        }

    }
    validateFormData = (data, field) => {
        switch(field){
            case 'profileInformation':
               return this.validateProfileInformation(data, field)
            default:
                return {}
        }

    }

    handleFormSubmit = e => {
        e.preventDefault()
        const {toastManager: {add}} = this.props;
        const {isValid, inValidElements} = this.validateFormData(this.state.profileInformation, 'profileInformation')
        
        console.log('this profile', this.state.profileInformation)
        console.log(isValid, inValidElements)

        if(isValid){
           this.props.updateUserProfile(this.state.profileInformation)
        }else{
            add('One or more fields not filled, Please check your form and try again', { appearance: 'error' })
            this.setState({
                inValidElements
            })
        }
    }
    isInvalid = (target,field) => {
        const index = this.state.inValidElements.findIndex(element => element.field === field && element.input === target)
        return index !== -1
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    render() {
        return (
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Account Settings</h4>
                    <button form="profile-info-form" onClick={this.handleFormSubmit} className="button mid-short primary">Save Changes</button>
                </div>
                <div className="form-box-items">
                    <div className="form-box-item">
                        <h4>Profile Information</h4>
                        <hr className="line-separator" />
                        <div className="profile-image">
                            <div className="profile-image-data" style={{float:'none'}}>
                                <figure className="user-avatar medium">
                                    <img src={profileImage} alt="profile-default" />
                                </figure>
                                <p className="text-header">Profile Photo</p>
                                <p className="upload-details">Minimum size 70x70px</p>
                            </div>
                            <div className="upload-btn-wrapper" style={{margin: '10px 0'}}>
                                <button className="btn">Upload photo</button>
                                <input type="file" name="myfile" />
                            </div>
                        </div>

                        <form id="profile-info-form">
                            <div className="input-container">
                                <label htmlFor="firstName" className="rl-label required">First Name</label>
                                <input type="text" className={`${this.isInvalid('firstName','profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="acc_name" name="firstName" value={this.state.profileInformation.firstName} placeholder="first name." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="lastName" className="rl-label required">Last Name</label>
                                <input type="text" className={`${this.isInvalid('lastName', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="acc_name" name="lastName" value={this.state.profileInformation.lastName} placeholder="last name" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="currentPassword" className="rl-label">Current Password</label>
                                <input type="password" className={`${this.isInvalid('currentPassword', 'profileInformation') ?  'invalid': ''}`} id="website_url" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="currentPassword" value={this.state.profileInformation.currentPassword} placeholder="Current password" />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="newPassword" className="rl-label">New Password</label>
                                <input type="password" className={`${this.isInvalid('newPassword', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="new_pwd" name="newPassword" value={this.state.profileInformation.newPassword} placeholder="Enter your new password here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="new_pwd2" className="rl-label">Repeat Password</label>
                                <input type="password" className={`${this.isInvalid('new_pwd2', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="new_pwd2" name="new_pwd2" value={this.state.profileInformation.new_pwd2} placeholder="Repeat your password here..." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="emailAddress" className="rl-label">Email</label>
                                <input type="email" id="new_email" className={`${this.isInvalid('emailAddress', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="emailAddress" value={this.state.profileInformation.emailAddress} placeholder="Enter your email address here..." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="phoneNumber" className="rl-label">Phone number</label>
                                <input type="text" id="new_email" className={`${this.isInvalid('phoneNumber', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="phoneNumber" value={this.state.profileInformation.phoneNumber} placeholder="Phone Number" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="country" className="rl-label required">Country</label>
                                <label htmlFor="country" className="select-block">
                                    <select name="country" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.country} id="country1">
                                        <option value="">Select your State/City...</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select>
                                </label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="about" className="rl-label">About</label>
                                <input type="text" id="about" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.about} name="about" placeholder="This will appear bellow your avatar... (max 140 char)" />
                            </div>
                            {/* <div className="input-container">
                                <label className="rl-label">Preferences</label>
                                <input type="checkbox" id="show_balance" onChange={this.handleInputChange} checked={this.state.showBalanceInStatusBar} value={this.state.profileInformation.show_balance} name="show_balance" />
                                <label htmlFor="show_balance" onClick={this.toggleShowAccountBalance} className="label-check">
                                    <span className="checkbox primary"><span></span></span>
                                    Show account balance in the status bar
                                </label>
                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.profileInformation.email_notif} checked={this.state.sendEmails} id="email_notif" name="email_notif" />
                                <label htmlFor="email_notif" onClick={this.toggleSendEmailNotification} className="label-check">
                                    <span className="checkbox primary"><span></span></span>
                                    Send me email notifications
                                </label>
                            </div> */}
                        </form>
                    </div>
                    <div className="form-box-item">
                        <h4>Biling Information</h4>
                        <hr className="line-separator"/>
                        <div className="input-container half">
                            <label htmlFor="first_name2" className="rl-label required">First Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" id="first_name2" value={this.state.billingInformation.firstName} name="firstName" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" value={this.state.billingInformation.lastName} id="last_name2" name="lastName" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="email" value={this.state.billingInformation.email} form="profile-info-form" id="email_address2" name="email" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.country} form="profile-info-form" name="country" id="country2">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.city} form="profile-info-form" name="city" id="state_city2">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.zipcode} type="text" id="zipcode2" name="zipcode" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.address} type="text" id="address" name="address" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <input type="checkbox" onChange={this.handleInputChange} form="profile-info-form" id="copy_shipping" checked={this.state.copyToShip} name="copy_shipping"  />
                            <label htmlFor="copy_shipping" onClick={this.copyToShipInformation} className="label-check">
                                <span className="checkbox primary"><span></span></span>
                                Copy information to shipping
                            </label>
                        </div>
                    </div>
                    <div className="form-box-item last-item">
                        <h4>Shipping Information</h4>
                        <hr className="line-separator"/>
                        <div className="input-container half">
                            <label htmlFor="first_name2" className="rl-label required">First Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="text" form="profile-info-form" id="first_name21" value={this.state.shippingInformation.firstName} name="firstName" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="text" form="profile-info-form" value={this.state.shippingInformation.lastName} id="last_name21" name="lastName" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="email" value={this.state.shippingInformation.email} form="profile-info-form" id="email_address21" name="email" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.country} form="profile-info-form" name="country" id="country21">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.city} form="profile-info-form" name="city" id="state_city21">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} form="profile-info-form" value={this.state.shippingInformation.zipcode} type="text" id="zipcode21" name="zipcode" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} form="profile-info-form" value={this.state.shippingInformation.address} type="text" id="address1" name="address" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="notes2" className="rl-label">Aditional Notes</label>
                            <textarea onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.note} form="profile-info-form" id="notes2" name="note1" placeholder="Enter aditional notes here..."></textarea>
                        </div>
                    </div>
                    <ErrorAlert 
                        open={this.props.error} closeSnackBar={this.closeSnackBar}
                         errorMessage={this.props.errorMessage} />
                    <SuccessAlert 
                        open={this.props.showSuccessBar} closeSnackBar={this.closeSnackBar}
                        message={this.props.message} 
                    />
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    const { home: {currentUser, showSuccessBar, message}, reg: { loading, error, errorMessage}} = state
    return {
        user: currentUser,
        loading,
        error,
        errorMessage,
        showSuccessBar,
        message
    }
}

export default connect(mapStateToProps, actions)(withToastManager(index));