import { 
    SUCCESSFUL_REGISTRATION, UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, 
    SUCCESS_RESENDING_PASSCODE, EMAIL_VERIFICATION_SUCCESFFUL,
    ERROR_RESENDING_PASSCODE, GET_SEC_QUESTIONS, LOGOUT_USER, EMAIL_FORGOT_PASSWORD_SENT,LOGIN_SUCCESS,
    LOGIN_UNSUCCESSFUL, PASSWORD_REST_SUCCESSFUL, USER_ROLE_UPDATED_SUCCESSFUL, UNAUTHORIZED_USER
 } from "./types";
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
            if(response.data.status === 200 ){
                 dispatch({type: SUCCESSFUL_REGISTRATION, payload: ''})
                // return window.location.href = window.origin + '/users/verify'
            }
        } catch(error){
            console.log('un able to o', error.response.data)
            if(error.response.data.message === 'A user with that emailAddress already exists!'){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email already exist'})
            }
            if(error.response.data.message === 'A user with that phoneNumber already exists!'){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Phone number exist'})
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
                //dispatch({type: SUCCESSFUL_VERIFICATION, payload: response.data})
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
                return dispatch({type: EMAIL_VERIFICATION_SUCCESFFUL, payload: ''})
                //return window.location.href = window.origin + '/users/profile'
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
                localStorage.setItem('azonta-user', JSON.stringify({
                    ...response.data.user
                }))
                localStorage.setItem('x-access-token',response.data.token) 
                return dispatch({type: LOGIN_SUCCESS, payload:''})
            }
        }catch(error){
            if(error.response.data.message === 'Please verify your email address'){
                localStorage.setItem('userRegDetails', JSON.stringify(user))
                return dispatch({type: LOGIN_UNSUCCESSFUL, payload: '' })
            }
            if(error.response.status === 404 || error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email or password does not exist'})
            }
            if(error.response.status === 401){
                return dispatch({type:UNSUCCESSFUL_REGISTRATION, payload: 'Account deactivated, please contact admininstrator' })
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
            if(error.response.status === 401){
               return dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
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
            if(error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email address does not exist'})
            }
            return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
            
        }
    }
 }
export const logout = (page= null) => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('userRegDetails')
    //window.location.href = window.origin;
    return {type: LOGOUT_USER, payload: page }
}

export const unauthorized = () => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('userRegDetails')
    //window.location.href = window.origin;
    return {type: UNAUTHORIZED_USER, payload: '' }
}

export const resetPasswordWithToken = userData => {
    return async (dispatch) =>{
        try{
            const response = await axios.post('/api/v1/user/reset-password', {...userData})
            console.log('respnse', response)
            dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: 'Password update successful, please login'})
            setTimeout(() => {
                //window.location.href = window.origin + '/users/login'
                dispatch({type: PASSWORD_REST_SUCCESSFUL, payload: ''})
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
            if(response.data.success || response.data.status === 200){
                dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: 'Account upgraded'})
                setTimeout(() => {
                    //window.location.href = window.origin + '/users/login'
                    dispatch({type: USER_ROLE_UPDATED_SUCCESSFUL, payload: ''})
                },2000)
            }
        }catch(error){
            if(error.response.status === 401){
               return  dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encountered'})
        }
    }
}