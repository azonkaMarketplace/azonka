import React, {  Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import Validator from 'validator';
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../actions";


class Register extends Component {
    state = {
        extendedUserType: 'user',
        emailAddress:'',
        phoneNumber:'',
        referalCode:'',
        repeatPassword: '',
        firstName:'',
        lastName: '',
        gender:'',
        password:'',
        companyName:'',
        companyAddress:'',
        contactLine: '',
        inValidElments: [],
        validationMessage: {},
        agreeToTerms: true
    }
    componentDidMount(){
        if(sessionStorage.getItem('reg-type'))
            this.setState({
                extendedUserType: sessionStorage.getItem('reg-type')
            })
    }
    extendedUserTypeChange = (event, value) => {
        this.setState({
            extendedUserType: value
        })
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            [name] : value,
            newInvalidElements
        })
    }

    validateFormData = (formdata) => {
        const { emailAddress, phoneNumber, password, repeatPassword, companyAddress,
        contactLine, companyName, extendedUserType,gender, firstName, lastName} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
            isValid = false
            inValidElments.push('emailAddress')
            
            validationMessage['emailAddress'] = 'Email required or not in right format'
        }
        if(!(phoneNumber.trim() !== '' && Validator.isNumeric(phoneNumber))){
            isValid = false
            inValidElments.push('phoneNumber')
            validationMessage['phoneNumber'] = 'Phone number must be a number'
        }
        if(!(firstName.trim())){
            isValid = false
            inValidElments.push('firstName')
            validationMessage['firstName'] = 'First name required'
        }
        if(!(lastName.trim())){
            isValid = false
            inValidElments.push('lastName')
            validationMessage['lastName'] = 'Last name required'
        }
        if(!(gender.trim())){
            isValid = false
            inValidElments.push('gender')
            validationMessage['gender'] = 'Please select one'
        }
        if(!(password.trim() !== '' && password.length >= 6)){
            isValid = false;
            inValidElments.push('password')
            validationMessage['password'] = 'minimum of 6 characters required'
        }
        if(!(repeatPassword === password)){
            isValid = false
            inValidElments.push('repeatPassword')
            validationMessage['repeatPassword'] = 'Repeat Password do not match'
        }
        
        if(extendedUserType.trim() !== ''){
            if(extendedUserType.trim() === 'seller'){
                if(!(companyAddress.trim() !== '')){
                    isValid = false
                    inValidElments.push('companyAddress')
                    validationMessage['companyAddress'] = 'Please provide company address'
                }
                if(!(companyName.trim() !== '')){
                    isValid = false
                    inValidElments.push('companyName')
                    validationMessage['companyName'] = 'Please provide company name'
                }
                if(!(contactLine.trim() !== '')){
                    isValid = false
                    inValidElments.push('contactLine')
                    validationMessage['contactLine'] = 'Please Provide contact Line'
                }
            }
        }else{
            isValid = false
            inValidElments.push('extendedUserType')
            validationMessage['extendedUserType'] = 'Select Profile type'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }

    static getDerivedStateFromProps(props, state){
        const { loading, error} = props; 
        return {loading, error}
    }
    processForm = () => {
        const {  error} = this.state; 
        const {toastManager: { add}} = this.props;
        if(error === 'some errors were encountered'){
            add('some errors were encountered', { appearance: 'error' })
        }
        console.log('called', this.state)
        return null
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const {add} = this.props.toastManager;
        const userData = {...this.state}

        if(!this.state.agreeToTerms)
            return add('You must agree to terms and condition', { appearance: 'error' })
        const validationResponse = this.validateFormData(userData)
        const { isValid} = validationResponse;
        if(!isValid){
            const { inValidElments, validationMessage} = validationResponse
           return  this.setState({
                inValidElments,
                validationMessage
            })
        }
        const { emailAddress, phoneNumber, referalCode, 
        password, repeatPassword, extendedUserType, 
        companyAddress, companyName, firstName, lastName, gender, contactLine} = this.state;
        localStorage.setItem('userRegDetails', JSON.stringify({
            emailAddress, phoneNumber, referalCode, contactLine,
            companyAddress, companyName, extendedUserType, password, repeatPassword,
            firstName, lastName, gender
        }))
        this.props.initiateRegistration()
        this.props.registerUser({
            emailAddress, phoneNumber, referalCode, password,
            repeatPassword, type:extendedUserType, companyAddress, companyName,
            firstName, lastName, gender, contactLine, profileImage:''
        })
        // return setTimeout(() => {
        //     return this.props.history.push(`/users/verify`)
        // }, 2000)
    }
    agreeTotermsChange = e => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }
    closeSnackBar = () => {
        console.log('closeing snackbar', this.state)
        this.props.clearError()
    }
    render() {
        const { classes } = this.props;
        return (
                <div className="form-popup custom-input">
                    <div className="form-popup-content">
                        <h4 className="popup-title">Register Account</h4>
                        <hr className="line-separator"/>
                        <form id="register-form" noValidate>
                        <div className="">
                            <label htmlFor="firstName" className="rl-label">First Name</label>
                            <input type="text" value={this.state.firstName} 
                                className={`${this.state.inValidElments.includes('firstName') ? 'invalid' : '' }`}
                                onChange={this.handleInputChange} id="new_pwd" name="firstName" placeholder="Enter your firstname" />
                            {
                                this.state.inValidElments.includes('firstName') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['firstName']}
                                    </div>
                                ): null 
                            }
                        </div>
                        <div className="">
                            <label htmlFor="lastName" className="rl-label">Last Name</label>
                            <input type="text" value={this.state.lastName} 
                                className={`${this.state.inValidElments.includes('lastName') ? 'invalid' : '' }`}
                                onChange={this.handleInputChange} id="lastName" name="lastName" placeholder="Enter your lastname"/>
                            {
                                this.state.inValidElments.includes('lastName') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['lastName']}
                                    </div>
                                ): null 
                            }
                        </div>
                        <div>
                            <label htmlFor="lastName" className="rl-label">Gender</label>
                            <select name="gender" onChange={this.handleInputChange}
                                value={this.state.gender}
                                className={`${this.state.inValidElments.includes('gender') ? 'invalid' : '' }`}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {
                                this.state.inValidElments.includes('gender') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['gender']}
                                    </div>
                                ): null 
                            }
                        </div>
                            <label htmlFor="emailAddress"  className="rl-label required">Email Address</label>
                            <input type="email" id="email_address2" className={`${this.state.inValidElments.includes('emailAddress') ? 'invalid' : '' }`} value={this.state.emailAddress} name="emailAddress" onChange={this.handleInputChange} placeholder="Enter your email address here..."/>
                            {
                                this.state.inValidElments.includes('emailAddress') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['emailAddress']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="phoneNumber" className="rl-label required">Phone Number</label>
                            <input type="text" id="phoneNumber" className={`${this.state.inValidElments.includes('phoneNumber') ? 'invalid' : '' }`} value={this.state.phoneNumber} name="phoneNumber" onChange={this.handleInputChange}  placeholder="Enter your hone number..."/>
                            {
                                this.state.inValidElments.includes('phoneNumber') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['phoneNumber']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="referalCode" className="rl-label">Referral Code</label>
                            <input type="text" id="referalCode" className={`${this.state.inValidElments.includes('referalCode') ? 'invalid' : '' }`} value={this.state.referalCode} name="referalCode" onChange={this.handleInputChange}  placeholder="Enter your referral code..." />
                            {
                                this.state.inValidElments.includes('referalCode') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['referalCode']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="password" className="rl-label required">Password</label>
                            <input type="password" id="password2" className={`${this.state.inValidElments.includes('password') ? 'invalid' : '' }`} name="password" value={this.state.password} onChange={this.handleInputChange}  placeholder="Enter your password here..."/>
                            {
                                this.state.inValidElments.includes('password') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['password']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="repeatPassword" className="rl-label required">Repeat Password</label>
                            <input type="password" id="repeat_password2" className={`${this.state.inValidElments.includes('repeatPassword') ? 'invalid' : '' }`} value={this.state.repeatPassword} name="repeatPassword" onChange={this.handleInputChange}  placeholder="Repeat your password here..."/>
                            {
                                this.state.inValidElments.includes('repeatPassword') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['repeatPassword']}
                                    </div>
                                ): null 
                            }
                            <div>
                                <input type="radio" id="agent" name="extenedUserType"
                                value="agent" checked={this.state.extendedUserType === 'user'} onChange={this.extendedUserTypeChange} />
                                <label  className="label-check" onClick={(event) => this.extendedUserTypeChange(event, 'user')}>
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
                                        onChange={(event) => this.extendedUserTypeChange(event)} checked={this.state.extendedUserType === 'seller'} />
                                <label  className="label-check" onClick={(event) => this.extendedUserTypeChange(event, 'seller')}>
                                    <span className="checkbox primary primary"><span></span></span>
                                    I want to sell
                                </label>
                            </div>
                            {
                                this.state.extendedUserType === 'seller' ? (
                                    <Zoom bottom>
                                        <div className="container-fluid" style={{paddingLeft: 0, paddingRight: 0}}>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 shopLocationContainer">
                                                    <label htmlFor="companyName" className="rl-label required">Company Name</label>
                                                    <input className={`${this.state.inValidElments.includes('companyName') ? 'invalid' : '' }`} type="text" name="companyName" value={this.state.companyName} onChange={this.handleInputChange}   placeholder="Company Name..." />
                                                    {
                                                        this.state.inValidElments.includes('companyName') ?
                                                        (
                                                            <div className="error-message required">
                                                                {this.state.validationMessage['companyName']}
                                                            </div>
                                                        ): null 
                                                    }
                                                </div>
                                                <div className="col-sm-12 col-md-6" >
                                                    <label htmlFor="companyAddress" className="rl-label required">Head Office Address</label>
                                                    <input className={`${this.state.inValidElments.includes('companyAddress') ? 'invalid' : '' }`} type="text" name="companyAddress" value={this.state.companyAddress} onChange={this.handleInputChange}   placeholder="Contact Address..." />
                                                    {
                                                        this.state.inValidElments.includes('companyAddress') ?
                                                        (
                                                            <div className="error-message required">
                                                                {this.state.validationMessage['companyAddress']}
                                                            </div>
                                                        ): null 
                                                    }
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12">
                                                    <label htmlFor="contactLine" className="rl-label required">Contact Line</label>
                                                    <input className={`${this.state.inValidElments.includes('contactLine') ? 'invalid' : '' }`} type="text" name="contactLine" value={this.state.contactLine} onChange={this.handleInputChange}   placeholder="Contact Line..." />
                                                    {
                                                        this.state.inValidElments.includes('contactLine') ?
                                                        (
                                                            <div className="error-message required">
                                                                {this.state.validationMessage['contactLine']}
                                                            </div>
                                                        ): null 
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Zoom>
                                ) : null
                            }
                            <div className="terms-condition-container">
                                <input type="checkbox" id="agreeToTerms"
                                    name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                                <label className="label-check" onClick={(event) => this.agreeTotermsChange(event)}>
                                    <span className="checkbox primary primary"><span></span></span>
                                    I agree
                                </label>
                                <span className="terms">
                                    terms and condition
                                </span>
                            </div>
                            <button className="button mid secondary" onClick={this.handleFormSubmit}>Register <span className="primary">Now!</span></button>
                        </form>
                        
                    </div>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={this.state.error}
                        autoHideDuration={6000}
                    >
                        <SnackbarContent
                            className={`${classes['warning']}`}
                            aria-describedby="client-snackbar"
                            message={
                                <span id="client-snackbar" className={classes.message}>
                                    <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`} />
                                    {this.props.errorMessage}
                                </span>
                            }
                            action={[
                                <IconButton key="close" aria-label="close"  onClick={this.closeSnackBar}  color="inherit">
                                    <CloseIcon className={classes.icon}/>
                                </IconButton>
                            ]}
                            />
                    </Snackbar>
                </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: { loading, error, errorMessage}} = state;
    return {
        loading,
        error,
        errorMessage
    }
}
const styles = theme => ({
    warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
})
export default connect(mapStateToProps, actions)(withStyles(styles)((withToastManager(Register))))