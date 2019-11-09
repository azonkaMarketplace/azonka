import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";

class AgentSignUp extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
        pincode: '',
        showSpinner: false
    }
    componentDidMount(){
        this.props.getSecurityQuestions()
        this.fileInput = React.createRef();
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
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
    renderQuestion = () => {
        return Object.keys(this.props.questions).length > 0 ?
         
             this.displayQuestions()
          : null
     }
     agreeTotermsChange = e => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }
     uploadId = e => {
         e.preventDefault()
         console.log('evebt', e.target.value)
        //  const { name, size, type} = this.fileInput.current.files[0]
         console.log(this.fileInput.current.files[0].name)
         console.log(this.fileInput.current.files[0].size)

     }
     validateFormData = (FormData) => {
        let isValid = true;
    
        return isValid
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if(!this.state.agreeToTerms){
            return this.props.renderError('You must agree to Policy and Privacy')
        }
        const isValid = this.validateFormData(this.state)
        if(isValid){
            console.log('form is valid')
            console.log('security questions', this.state)
            //call the api
            this.props.initiateRegistration()
            // const pincode = this.state.pincode;
            const agentIdentification = ''
            // const securityAnswerOne = this.state.questions.find(question => question.question_id === '1').answer
            // const securityAnswerTwo = this.state.questions.find(question => question.question_id === '2').answer
            // const securityAnswerThree = this.state.questions.find(question => question.question_id === '3').answer
            this.props.updateUserType({ agentIdentification }, 'agent')
            
            //naviagate the user to profile page
            //call the api
        }else{
            //form is not valid display error
            this.props.renderError('One or more fields not filled, please cheack and try again')
        }
    }
    render() {
        return (
            <div className="form-popup custom-input" style={{ width: '80%',paddingBottom:'20px',
             maxWidth: '800px' }}>
                <div className="form-popup-headline secondary">
                    <h2>Signup to be an Agent!</h2>
                </div>
                <form style={{ margin: '0 auto', width: '90%' }}>
                <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Upload ID</h4>
                        <hr className="line-separator" />
                    </div>
                    <div className="custom-file-input-button">
                        <input type="file" ref={this.fileInput}  name="agentID" value={this.state.agentID} onChange={this.uploadId} />
                    </div>
                    {/* <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Security Questions</h4>
                        <hr className="line-separator" />
                    </div>

                    {this.renderQuestion()} */}
                    {/* <div style={{ padding: '20px 10px 0 10px' }}>
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif'
                        }}>Setup Pincode</h4>
                        <hr className="line-separator" />
                    </div> */}
                    {/* <input className={`${this.state.inValidElments.includes('pincode') ? 'invalid' : ''}`} type="text" name="pincode" value={this.state.pincode} onChange={this.handleInputChange} placeholder="Enter Pincode" />
                    {
                        this.state.inValidElments.includes('pincode') ?
                            (
                                <div className="error-message required">
                                    {this.state.validationMessage['pincode']}
                                </div>
                            ) : null
                    } */}
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

export default connect(mapStateToProps, actions)(withToastManager(AgentSignUp))