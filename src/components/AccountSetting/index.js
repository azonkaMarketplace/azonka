import React, { Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import Validator from "validator";
import profileImage from "../../images/dashboard/profile-default-image.png";
import { connect } from "react-redux";

class index extends Component {
    state = {
        profileInformation: {},
        billingInformation: {},
        shippingInformation: {},
        copyToShip: false,
        showBalanceInStatusBar: true,
        sendEmails: true,
        inValidElements: [],
        changedElements: []
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
        const touchedElementsIndex = this.state.changedElements.findIndex(element => element === name)
        const newTouchedElements = this.state.changedElements
        if(touchedElementsIndex === -1){
            newTouchedElements.push(name)
        }
        this.setState({
            [field] : {...this.state[field], [name]: value},
            inValidElements: [...this.state.inValidElements],
            changedElements: [...newTouchedElements]
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
        Object.keys(data).forEach(element => {
            if(element === 'emailAddress'){
                if(!Validator.isEmail(data[element])){
                    isValid = false;
                    inValidElements.push({field, input:'emailAddress'})
                }
            }
            if(element === 'phoneNumber'){
                if(!/^[0-9]*$/.test(data['phoneNumber'])){
                    isValid = false;
                    inValidElements.push({field, input:'phoneNumber'})
                }
            }
            else if(data[element].trim() === ''){
                
                isValid = false;
                inValidElements.push({field, input:'firstName'})
            }
        })
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
        const updatedElement = {};
        this.state.changedElements.forEach(element => {
            updatedElement[element] = this.state.profileInformation[element]
        })
        const {isValid, inValidElements} = this.validateFormData(updatedElement, 'profileInformation')
        
        console.log('this profile', updatedElement)
        console.log(isValid, inValidElements)

        if(isValid){
            if(Object.keys(updatedElement).length > 0){
                this.props.initiateRegistration()
                this.props.updateUserProfile(updatedElement)
                this.setState({
                    changedElements: []
                })
            }
        }else{
            console.log('not called')
            this.props.renderError('One or more fields not filled, Please check your form and try again')
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
                    <h4>Profile</h4>
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
                                <p className="upload-details">Minimum size 70x70px (optional)</p>
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
                        </form>
                    </div>
                    
                    {/* <div className="form-box-item last-item">
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
                    </div> */}
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