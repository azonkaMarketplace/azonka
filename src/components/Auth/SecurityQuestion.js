import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";

class SecurityQuestion extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
        container: 'form',
        pincode: '',
        answer: '',
        question: '',
        securityQuestion: []
    }
    componentDidMount(){
        // call the api to fetch security questions
        this.props.initiateRegistration()
        this.props.getSecurityQuestions()
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.questions.length !== state.securityQuestion.length){
            const securityQuestion = []
            Object.keys(nextProps.questions).forEach(key => {
                securityQuestion.push({id: key, question: nextProps.questions[key]})
            })
            return {...state, securityQuestion}
        }
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;
        this.setState({
            [name]: value
        })
        
    }
    displayQuestions = () => {
        const keys = Object.keys(this.props.questions)
        return keys.map((element, index) => (
            <div key={index}>
                 <div><span className="question-number">
                     { index + 1}.</span><span 
                         className="question-tag">{this.props.questions[element]}</span></div>
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
        console.log('questions', this.props.questions)
        const securityQuestion = []
        Object.keys(this.props.questions).forEach(key => {
            securityQuestion.push({id: key, question: this.props.question[key]})
        })
        if(this.props.questions.length !== this.state.securityQuestion.length ){
            this.setState({
                securityQuestion
            })
        }
        return null
    }
    onSubmit = event => {
        event.preventDefault();
        if(this.state.question.trim() === ''){
            return this.props.renderError('Please choose a question and provide answer')
        }
        if(this.state.answer.trim() === ''){
            return this.props.renderError('Please provide answer')
        }
        if(this.state.pincode.trim() === ''){
            
           return  this.props.renderError('Please provide pincode')
        }
        if(this.state.pincode.length !== 6){
            return this.props.renderError('Minimum of 6 characters required for Pincode')
        }
        //call the api
        this.props.initiateRegistration()
        const { question, answer, pincode} = this.state;
        const { type} = JSON.parse(localStorage.getItem('azonta-user'))
        this.props.updateUserType({ securityQuestion: question, securityAnswer: answer, 
            pin:pincode}, type)
    }
    render() {
        return (
            <div>
                <div className={`form-popup custom-input ${this.state.container === 'form' ? 'show': 'hide'}`}>
                    <div className="form-popup-headline secondary">
                        <h2>Security Qestions</h2>
                        <p>Please kindly provide answers</p>
                    </div>
                    <div className="form-popup-content">
                        <form id="login-form2">
                        <label htmlFor="emailAddress" className="rl-label required">Question</label>
                            <select name="question" value={this.state.question} onChange={this.handleInputChange}>
                                <option value="">Select Question</option>
                                {
                                    this.state.securityQuestion.map(({id, question}, i) => {
                                        return <option key={i} value={id}>{question}</option>
                                    })
                                }
                            </select>
                            <label htmlFor="answer" className="rl-label required">Response</label>
                            <input type="text" name="answer" value={this.state.answer} onChange={this.handleInputChange} />
                            <label htmlFor="emailAddress" className="rl-label required">Pincode</label>
                            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                <input type="text" value={this.state.pincode}
                                    size={6} name="pincode" onChange={this.handleInputChange} style={{width:'100%'}} className="one-time-pwd-input" placeholder="Enter Pin" />
                            </div>
                            <button className="button mid secondary" onClick={this.onSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: {questions, errorMessage, error}} = state;
    return {
        questions,error, errorMessage
    }
}

export default connect(mapStateToProps, actions)(withToastManager(SecurityQuestion))