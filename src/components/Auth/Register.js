import React, {  Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import Validator from 'validator';
import Fade from "react-reveal/Fade";
import { connect } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../actions";
import countryData from "../../assets/countryCode.json";
import { Link } from 'react-router-dom';


class Register extends Component {
    state = {
        extendedUserType: 'user',
        emailAddress:'',
        phoneNumber:'',
        referredBy:'',
        repeatPassword: '',
        firstName:'',
        lastName: '',
        gender:'Male',
        password:'',
        companyName:'',
        headOfficeAddress:'',
        contactLine: '',
        country:'',
        inValidElments: [],
        countryCode:'+234',
        isoCode:'NGA',
        validationMessage: {},
        agreeToTerms: true,
        showSpinner: false
    }
    componentDidMount(){
        // if(sessionStorage.getItem('reg-type'))
        //     this.setState({
        //         extendedUserType: sessionStorage.getItem('reg-type')
        //     })
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
        if(name ==='country'){
            let countryCode, isoCode = null
            const index = countryData.findIndex(element => element.country === value)
            if(index !== -1){
                countryCode = countryData.find(element => element.country === value).countryCode
                isoCode = countryData.find(element => element.country === value).isoCode
            }
            return this.setState({
                [name] : value,
                newInvalidElements,
                countryCode,
                isoCode
            }, () => console.log(this.state))
        }
        this.setState({
            [name] : value,
            newInvalidElements
        })
    }
    clearSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    validateFormData = (formdata) => {
        const { emailAddress, phoneNumber, password, repeatPassword, headOfficeAddress,
        contactLine, companyName, extendedUserType,gender,country, firstName, lastName} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
            isValid = false
            inValidElments.push('emailAddress')
            
            validationMessage['emailAddress'] = 'Email required or not in right format'
        }
        if(country.trim() === ''){
            isValid = false;
            inValidElments.push('country')
            validationMessage['country'] = 'Please select country'
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
                if(!(headOfficeAddress.trim() !== '')){
                    isValid = false
                    inValidElments.push('headOfficeAddress')
                    validationMessage['headOfficeAddress'] = 'Please provide company address'
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
            add('Some errors were encountered', { appearance: 'error' })
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
        this.setState({
            showSpinner : true
        })
        const { emailAddress, phoneNumber, referredBy, 
        password, repeatPassword, extendedUserType, 
        headOfficeAddress, companyName, firstName, lastName, gender,country, countryCode,isoCode,
         contactLine} = this.state;
        localStorage.setItem('userRegDetails', JSON.stringify({
            emailAddress, phoneNumber, referredBy, contactLine,
            headOfficeAddress, companyName, extendedUserType, password, repeatPassword,
            firstName, lastName, gender, country, countryCode, isoCode
        }))
        this.props.initiateRegistration()

        if(this.state.extendedUserType !== 'user'){
           return this.props.history.push('/users/securityquestions')
        }
        console.log('this', this.state)
        return this.props.registerUser({
            emailAddress, phoneNumber, referredBy, password,
            repeatPassword, type:extendedUserType, headOfficeAddress, companyName,
            firstName, lastName, gender, contactLine, profileImage:'',
            country, countryCode, isoCode
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
    redirectToVeriy = () => {
        this.props.history.push('/users/verify')
        return null
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
                            <input type="text" id="phoneNumber" className={`${this.state.inValidElments.includes('phoneNumber') ? 'invalid' : '' }`} value={this.state.phoneNumber} name="phoneNumber" onChange={this.handleInputChange}  placeholder="Enter your phone number..."/>
                            {
                                this.state.inValidElments.includes('phoneNumber') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['phoneNumber']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="country" className="rl-label required">Select Country</label>
                            <select name="country" className={`${this.state.inValidElments.includes('country') ? 'invalid' : '' }`} value={this.state.country} onChange={this.handleInputChange}>
                                <option value="">Select country</option>
                                <option value="Nigeria">Nigeria</option>
                            </select>
                            {
                                this.state.inValidElments.includes('country') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['country']}
                                    </div>
                                ): null 
                            }
                            <label htmlFor="referredBy" className="rl-label">Referral Code</label>
                            <input type="text" id="referredBy" className={`${this.state.inValidElments.includes('referredBy') ? 'invalid' : '' }`} value={this.state.referredBy} name="referredBy" onChange={this.handleInputChange}  placeholder="Enter your referral code..." />
                            {
                                this.state.inValidElments.includes('referredBy') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['referredBy']}
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
                            
                            
                            
                            {
                                this.state.extendedUserType === 'seller' ? (
                                    <Fade right>
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
                                                    <label htmlFor="headOfficeAddress" className="rl-label required">Head Office Address</label>
                                                    <input className={`${this.state.inValidElments.includes('headOfficeAddress') ? 'invalid' : '' }`} type="text" name="headOfficeAddress" value={this.state.headOfficeAddress} onChange={this.handleInputChange}   placeholder="Contact Address..." />
                                                    {
                                                        this.state.inValidElments.includes('headOfficeAddress') ?
                                                        (
                                                            <div className="error-message required">
                                                                {this.state.validationMessage['headOfficeAddress']}
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
                                    </Fade>
                                ) : null
                            }
                            <div className="terms-condition-container">
                                <input type="checkbox" id="agreeToTerms"
                                    name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                                <label className="label-check" onClick={(event) => this.agreeTotermsChange(event)}>
                                    <span className="checkbox primary primary"><span></span></span>
                                    I agree to
                                </label>
                                <span className="terms">
                                    terms and condition
                                </span>
                            </div>
                            <p style={{margin:'0px 0px', textAlign:'center'}}>Have an account? 
                                <Link style={{color:'#00d7b3', cursor:'pointer'}} to="/users/login"> Login</Link></p>
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
                    {
                       this.props.loading ? <div className="spinner"><CircularProgress /></div> : null
                    }
                    {
                        this.props.redirectToVerify ? this.redirectToVeriy() : null
                    }
                </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: { loading, error, errorMessage, redirectToVerify}} = state;
    return {
        loading,
        error,
        errorMessage,
        redirectToVerify
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