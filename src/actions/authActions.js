import { 
    SUCCESSFUL_REGISTRATION, UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, 
    SUCCESS_RESENDING_PASSCODE, SUCCESSFUL_VERIFICATION, 
    ERROR_RESENDING_PASSCODE, GET_SEC_QUESTIONS, LOGOUT_USER } from "./types";
import axios from "axios";

export const registerUser = (userData) => {
    console.log('data', userData)
    return async (dispatch) => {
        let response;
        try{
            response = await axios.post('/api/v1/registration/signup',{
                ...userData
            })
            console.log(response.data);
            if(response.status === 200 ){
                 dispatch({type: SUCCESSFUL_REGISTRATION, payload: ''})
                 return window.location.href = window.origin + '/users/verify'
            }
        } catch(error){
            console.log('un able to o', error.response.data)
            if(error.response.data.message === 'A user with that emailAddress already exists!'){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email already exists'})
            }
            if(error.response.data.message === 'A user with that phoneNumber already exists!'){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Phone number exists'})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'some errors were encountered'})
        }
        
        
    }
}

export const clearError = () => {
    return { type: CLEAR_ERROR, payload: ''}
}

export const verifyEmail = (userData) => {
    console.log('user-data', userData)
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/registration/verify-email', {
                ...userData
            })
            
            if(response.status === 200 ){
                console.log('response', response.data)
                //localStorage.removeItem('userRegDetails')
                dispatch({type: SUCCESSFUL_VERIFICATION, payload: response.data})
                localStorage.setItem('azonta-user', JSON.stringify(response.data.user))
                //axios.defaults.headers.common['x-access-token'] = response.data.token
                localStorage.setItem('x-access-token', response.data.token)
                
                localStorage.removeItem('userRegDetails')
                return window.location.href = window.origin + '/users/profile'
           }
        }catch(error) {
            if(error.response.status === 498){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email and passcode mismatch'})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: error.response.data.message})
            //return window.location.href = window.origin + '/users/login'
        }
    }
}
 
export const resendEmail = emailAddress => {
    console.log(emailAddress)
    return async(dispatch) => {
        try{
            const response = await axios.post('/api/v1/registration/resend-verification-code', {
                emailAddress
            })
            if(response.status === 200){
                console.log('response', response.data)
                dispatch({type: SUCCESS_RESENDING_PASSCODE, payload: ''})
            }
        }catch(error){
            console.log('eror', error.response)
            dispatch({type: ERROR_RESENDING_PASSCODE, payload: error.message})
        }
    }
}

export const login = user => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/authentication/login', {
                ...user
            })
            if(response.status === 200){
                axios.defaults.headers.common['x-access-token'] = response.data.token
                console.log('response', response.data)
                localStorage.setItem('azonta-user', JSON.stringify(response.data.user))
                window.location.href = window.origin + '/users/profile'
            }
        }catch(error){
            console.log('error', error.response)
            if(error.response.data.message === 'Please verify your email address'){
                localStorage.setItem('userRegDetails', JSON.stringify(user))
                return window.location.href = window.origin + '/users/verify'
            }
            if(error.response.status === 404 || error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: error.response.data.message})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'some errors were encountered, please try again'})
        }
    }
}

export const getSecurityQuestions = () => {
    return async (dispatch)=> {
        try{
            const response = await axios.get('/api/v1/user/get-security-questions')
            dispatch({type: GET_SEC_QUESTIONS, payload: response.data.questions})
        }catch(error){

            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'some errors were encountered'})
            window.location.href = window.origin + '/users/register'
        }
    }
}

export const logout = () => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    window.location.href = window.origin;
    return {type: LOGOUT_USER, payload: '' }
}