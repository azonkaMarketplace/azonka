import React, { Component } from 'react';
import questions from "../../assets/securityQuestion.json";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";

class SecurityQuestion extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
    }
    componentDidMount(){
        // call the api to fetch security questions
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
    renderQuestion = () => (
        questions.map(({question_id, question}, index) => (
           <div key={question_id}>
                <div><span>{ index + 1}</span>{question}</div>
                <CustomInput
                    onIputChange={this.handleInputChange}
                    name={question_id}
                    placeholder={question}
                    error={this.state.inValidElments.includes(`${question_id}`)}
                    errorMessage={'Required, please provide'}
                />
           </div>
        ))
    )
    validateFormData = (answered_question, questions_resource) => {
        const unansweredQuestions = []
        let isValid = true;
        if(answered_question.length !== questions_resource.length){
            isValid = false;
            questions_resource.forEach(({question_id}) => {
                const index = answered_question.findIndex(({question_id: id}) => parseInt(id) === question_id)
                if(index === -1){
                    unansweredQuestions.push(`${question_id}`)
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
        this.setState({
            inValidElments: [...unansweredQuestions]
        })
        return isValid
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const {toastManager: { add}} = this.props;
        const isValid = this.validateFormData(this.state.questions, questions)
        if(isValid){
            console.log('form is valid')
            console.log('security questions', this.state.questions)
            //call the api
            
            
            
            //naviagate the user to profile page
            setTimeout(() => {
                add('Please check your mail for your pincode. Please keep it secret!', { appearance: 'success' })
                this.props.history.push('/users/profile')
            }, 2000)
        }else{
            //form is not valid display error
            
            add('One or more fields not filled, please cheack and try again', { appearance: 'error' })
        }
    } 
    render() {
        return (
            <div className="form-popup custom-input">
                <div className="form-popup-headline secondary">
                    <h2>Security Qestions</h2>
                    <p>Please kindly provide answers</p>
                </div>
                <div className="form-popup-content">
                    <form id="login-form2">
                        {this.renderQuestion()}
                        <button className="button mid secondary" onClick={this.handleFormSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withToastManager(SecurityQuestion);