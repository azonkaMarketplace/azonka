import { 
    SUCCESSFUL_REGISTRATION, UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, 
    SUCCESS_RESENDING_PASSCODE, SUCCESSFUL_VERIFICATION, 
    ERROR_RESENDING_PASSCODE, GET_SEC_QUESTIONS, LOGOUT_USER, EMAIL_FORGOT_PASSWORD_SENT } from "./types";
import axios from "axios";

export const registerUser = (userData) => {
    console.log('data', userData)
    const data = {...userData, phoneNumber: userData.phoneNumber[0] === '0' ? userData.phoneNumber.substr(1,
        userData.phoneNumber.length) : userData.phoneNumber}
    return async (dispatch) => {
        let response;
        try{
            console.log('data', data)
            response = await axios.post('/api/v1/registration/signup',{
                ...data
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
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
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
                if(Array.isArray(response.data.user)){
                    localStorage.setItem('azonta-user', JSON.stringify({
                        ...response.data.user[0]
                    }))
                }else{
                    localStorage.setItem('azonta-user', JSON.stringify({
                        ...response.data.user
                    }))
                }
                
                //axios.defaults.headers.common['x-access-token'] = response.data.token
                localStorage.setItem('x-access-token', response.data.token)
                
                localStorage.removeItem('userRegDetails')
                return window.location.href = window.origin + '/users/profile'
           }
        }catch(error) {
            if(error.response.status === 498){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email and passcode mismatch'})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors where encountered'})
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
                localStorage.setItem('azonta-user', JSON.stringify({
                    ...response.data.user
                }))
                localStorage.setItem('x-access-token',response.data.token) 
                window.location.href = window.origin + '/users/profile'
            }
        }catch(error){
            console.log('error', error.response)
            if(error.response.data.message === 'Please verify your email address'){
                localStorage.setItem('userRegDetails', JSON.stringify(user))
                return window.location.href = window.origin + '/users/verify'
            }
            if(error.response.status === 404 || error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email or password does not exists'})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered, please try again'})
        }
    }
}

export const getSecurityQuestions = () => {
    return async (dispatch)=> {
        try{
            const response = await axios.get('/api/v1/user/get-security-questions')
            dispatch({type: GET_SEC_QUESTIONS, payload: response.data.questions})
        }catch(error){

            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
            window.location.href = window.origin + '/users/register'
        }
    }
}
export const forgotPassword = emailAddress => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/user/forgot-password', {
                emailAddress
            })
            return dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: response.data.message})
        }catch(error) {
            console.log('er', error.response)
            if(error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email address does not exists'})
            }
            return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
            
        }
    }
 }
export const logout = () => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    window.location.href = window.origin;
    return {type: LOGOUT_USER, payload: '' }
}

export const resetPasswordWithToken = userData => {
    return async (dispatch) =>{
        try{
            const response = await axios.post('/api/v1/user/reset-password', {...userData})
            console.log('respnse', response)
            dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: 'Password updated successful, please login'})
            setTimeout(() => {
                window.location.href = window.origin + '/users/login'
            },2000)
        }catch(error){
            console.log('error response', error.response.data)
            if(error.response.data.message === 'Reset token expired or invalid'){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Not Allowed, Invalid token'})
            }
        }
    }
}

export const updateUserType = (userData, type) => {
    return async (dispatch) => {
        try {
            const response = await axios.put('/api/v1/user/change-account-type', {
                                ...userData,type}, {
                                headers: {
                                    'x-access-token': localStorage.getItem('x-access-token')
                                }
                            })
            if(response.data.success){
                dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: 'Account upgraded to seller'})
                setTimeout(() => {
                    window.location.href = window.origin + '/users/profile'
                },2000)
            }
        }catch(error){
            console.log(error.response)
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
        }
    }
}