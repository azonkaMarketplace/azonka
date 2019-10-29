import { SUCCESSFUL_REGISTRATION,INITIAL_REGISTRATION, 
    UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, SUCCESSFUL_VERIFICATION,
ERROR_RESENDING_PASSCODE, SUCCESS_RESENDING_PASSCODE, GET_SEC_QUESTIONS,
 LOGOUT_USER, CLOSE_SNACKBAR, EMAIL_FORGOT_PASSWORD_SENT, GET_SAVED_ACCOUNTS } from "../actions/types";
const INITIAL_STATE = {loading: false,verified:null, error: null,errorMessage: null,
     user: null, questions:{}, successMessage: null, showSuccessBar: null}

export default (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case INITIAL_REGISTRATION:
                return {...state, loading:true, error: null}
        case SUCCESSFUL_REGISTRATION:
            return {...state, loading:false, error: null, errorMessage: null}
        case UNSUCCESSFUL_REGISTRATION:
            return {...state, loading: false,error:true, errorMessage: actions.payload}
        case SUCCESSFUL_VERIFICATION:
            return {...state, loading: false,verfied: true, error: null, user: actions.payload}
        case CLEAR_ERROR:
            return {...state, error: null}
        case SUCCESS_RESENDING_PASSCODE: 
            return {...state, error: null, errorMessage: actions.payload}
        case ERROR_RESENDING_PASSCODE:
            return {...state, error: true, errorMessage: actions.payload}
        case GET_SEC_QUESTIONS:
            return {...state, questions: actions.payload, error: null, errorMessage: null}
        case LOGOUT_USER: 
            return {...state, user: null}
        case CLOSE_SNACKBAR:
            return {...state, error: null, errorMessage:null, showSuccessBar: null}
        case EMAIL_FORGOT_PASSWORD_SENT: 
            return {...state, showSuccessBar: true, successMessage:actions.payload}
        case GET_SAVED_ACCOUNTS:
            return {...state, showSuccessBar: true, successMessage:'Account added successfully'}
        default: 
            return {...state}
    }
}