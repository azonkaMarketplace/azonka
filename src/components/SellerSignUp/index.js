import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomInput from "../../common/CustomInput";
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";
import { Redirect } from "react-router-dom";

class SellerSignUp extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
        container: 'form',
        pincode: '',
        companyName:'',
        headOfficeAddress:'',
        contactLine: '',
        showSpinner: false
    }
    componentDidMount(){
        this.props.getSecurityQuestions()
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;

        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        newInvalidElements = [...this.state.inValidElments]
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        if(name === 'pincode' || name === 'companyName' 
            || name === 'headOfficeAddress' || name === 'contactLine'){
            return this.setState({
                [name]: value
            })
        }
        if(this.state.questions.length <= 0){
            this.setState({
                questions : [{question_id: name, answer: value}],
                newInvalidElements
            })
        }else{
            let newQuestion = []
            const index = this.state.questions.findIndex(({question_id}) => question_id === name)
            if(index !== -1){
                newQuestion = this.state.questions;
                newQuestion.splice(index, 1)
                this.setState({
                    questions: [...newQuestion, {[name]: value}],
                    newInvalidElements
                })
            }
            this.setState({
                questions: [...this.state.questions, {question_id: name, answer: value}],
                newInvalidElements
            })
        }
    }
    agreeTotermsChange = e => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }
    displayQuestions = () => {
        const keys = Object.keys(this.props.questions)
        return keys.map((element, index) => (
            <div key={index}>
                 <div>
                     <label className="rl-label required">
                     <span style={{paddingRight:8}}>
                     { index + 1}.</span>  {this.props.questions[element]}
                     </label>
                </div>
                 <CustomInput
                     onIputChange={this.handleInputChange}
                     name={element}
                     placeholder={this.props.questions[element]}
                     error={this.state.inValidElments.includes(`${element}`)}
                     errorMessage={'Required, please provide'}
                 />
            </div>))
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    renderQuestion = () => {
        return Object.keys(this.props.questions).length > 0 ?
         
             this.displayQuestions()
          : null
     }
     logout = () => {
         this.props.logout()
         return <Redirect to="/users/login" />
     }
     validateFormData = (FormData) => {
        const unansweredQuestions = []
        let isValid = true;
        let requiredField = []
        const answered_question = FormData.questions
        const keys = Object.keys(this.props.questions)
        if(answered_question.length !== keys.length){
            isValid = false;
            keys.forEach((element) => {
                const index = answered_question.findIndex(({question_id: id}) => id === element)
                if(index === -1){
                    unansweredQuestions.push(`${element}`)
                }
            })
            
            //
        }else{
            answered_question.forEach(item => {
                if(item.answer.trim() === ''){
                    isValid = false
                    unansweredQuestions.push(item.question_id)
                }
            })
        }
        if(FormData.companyName.trim() === ''){
            requiredField.push('companyName')
        }
        if(FormData.pincode.trim() === ''){
            requiredField.push('pincode')
        }
        this.setState({
            inValidElments: [...unansweredQuestions, ...requiredField]
        })
        return isValid
    }
    closeSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const {toastManager: { add}} = this.props;
        if(!this.state.agreeToTerms){
           return add('You must agree to Policy and Privacy', { appearance: 'error' })
        }
        const isValid = this.validateFormData(this.state)
        if(isValid){
            console.log('form is valid')
            console.log('security questions', this.state)
            //call the api
            this.props.initiateRegistration()
            const pincode = this.state.pincode;
            const referredBy = this.state.referredBy
            const companyName = this.state.companyName;
            const headOfficeAddress = this.state.headOfficeAddress;
            const contactLine = this.state.contactLine;
            const sellerIdentification = ''
            const securityAnswerOne = this.state.questions.find(question => question.question_id === '1').answer
            const securityAnswerTwo = this.state.questions.find(question => question.question_id === '2').answer
            const securityAnswerThree = this.state.questions.find(question => question.question_id === '3').answer
            this.props.updateUserType({
                securityAnswerOne, securityAnswerTwo, securityAnswerThree,
                pin:pincode, referredBy, companyName, headOfficeAddress, contactLine, sellerIdentification
                
            }, 'seller')
            
            //naviagate the user to profile page
            //call the api
        }else{
            //form is not valid display error
            
            add('One or more fields not filled, please cheack and try again', { appearance: 'error' })
        }
    }
    render() {
        return (
            <div className="form-popup custom-input" style={{ width: '80%',paddingBottom:'20px',
             maxWidth: '800px' }}>
                <div className="form-popup-headline secondary">
                    <h2>Signup to be a Seller!</h2>
                </div>
                <form style={{ margin: '0 auto', width: '90%' }}>
                    <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Sellers Information</h4>
                        <hr className="line-separator" />
                    </div>

                    <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 shopLocationContainer">
                                <label htmlFor="companyName" className="rl-label required">Company Name</label>
                                <input className={`${this.state.inValidElments.includes('companyName') ? 'invalid' : ''}`} type="text" name="companyName" value={this.state.companyName} onChange={this.handleInputChange} placeholder="Company Name..." />
                                {
                                    this.state.inValidElments.includes('companyName') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['companyName']}
                                            </div>
                                        ) : null
                                }
                            </div>
                            <div className="col-sm-12 col-md-6" >
                                <label htmlFor="headOfficeAddress" className="rl-label">Head Office Address</label>
                                <input className={`${this.state.inValidElments.includes('headOfficeAddress') ? 'invalid' : ''}`} type="text" name="headOfficeAddress" value={this.state.headOfficeAddress} onChange={this.handleInputChange} placeholder="Contact Address..." />
                                {
                                    this.state.inValidElments.includes('headOfficeAddress') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['headOfficeAddress']}
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <label htmlFor="contactLine" className="rl-label">Contact Line</label>
                                <input className={`${this.state.inValidElments.includes('contactLine') ? 'invalid' : ''}`} type="text" name="contactLine" value={this.state.contactLine} onChange={this.handleInputChange} placeholder="Contact Line..." />
                                {
                                    this.state.inValidElments.includes('contactLine') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['contactLine']}
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Security Questions</h4>
                        <hr className="line-separator" />
                    </div>

                    {this.renderQuestion()}
                    <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Referred By</h4>
                        <hr className="line-separator" />
                    </div>
                    <label htmlFor="referredBy" className="rl-label">Referral Code</label>
                    <input className={`${this.state.inValidElments.includes('referredBy') ? 'invalid' : ''}`} type="text" name="referredBy" value={this.state.referredBy} onChange={this.handleInputChange} placeholder="Referral Code" />
                    {
                        this.state.inValidElments.includes('referredBy') ?
                            (
                                <div className="error-message required">
                                    {this.state.validationMessage['referredBy']}
                                </div>
                            ) : null
                    }
                    <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Setup Pincode</h4>
                        <hr className="line-separator" />
                    </div>
                    <input className={`${this.state.inValidElments.includes('pincode') ? 'invalid' : ''}`} type="text" name="pincode" value={this.state.pincode} onChange={this.handleInputChange} placeholder="Enter Pincode" />
                    {
                        this.state.inValidElments.includes('pincode') ?
                            (
                                <div className="error-message required">
                                    {this.state.validationMessage['pincode']}
                                </div>
                            ) : null
                    }
                    <div className="terms-condition-container">
                        <input type="checkbox" id="agreeToTerms"
                           onChange={this.agreeTotermsChange} name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                        <label className="label-check" onClick={(event) => this.agreeTotermsChange(event)}>
                            <span className="checkbox primary primary"><span></span></span>
                            I agree To
                                </label>
                        <span className="terms">
                            Privacy and Policy
                                </span>
                    </div>
                    <div className="right-content">
                        <button className="button mid secondary" onClick={this.handleFormSubmit}>Submit</button>
                    </div>
                </form>
                <SuccessAlert 
                    open={this.props.showSuccessBar} closeSnackBar={this.closeSnackBar}
                    message={this.props.successMessage} 
                />
                <ErrorAlert open={this.props.error} closeSnackBar={this.closeSnackBar} errorMessage={this.props.errorMessage} />
                {
                    this.props.redirectToLogin ? <Redirect to="/users/login" /> : null
                }
                {
                    this.props.loading ? <div className="spinner"><CircularProgress /></div> : null
                }
                {
                    this.props.unAuthorized ? this.logout() : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg:{ loading, error, errorMessage, successMessage,
        questions, showSuccessBar, redirectToLogin, unAuthorized}} = state;
    return {
        loading,
        error, 
        errorMessage,
        showSuccessBar,
        successMessage,
        questions,
        redirectToLogin,
        unAuthorized
    }
}

export default connect(mapStateToProps,actions)(withToastManager(SellerSignUp))