import { FETCH_USER, SWITCH_ACTIVE_LINK,TOGGLE_VIEW_TYPE,INITIAL_REGISTRATION,
SUCCESSFUL_REGISTRATION, UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, 
SUCCESS_RESENDING_PASSCODE, SUCCESSFUL_VERIFICATION, ERROR_RESENDING_PASSCODE } from "./types";
import axios from "axios";

export const fetchUser = () => {
    const user =  JSON.parse(localStorage.getItem('azonta-user'))
    let likes = 0
    let cart = 0
    let userData = null
    let anonynmousUser = {}
    //if there is no authenticated user, check if there is userdata stored in localstorage
    //this enables user to carry out operation without registering or logging
    if(!user)
        anonynmousUser = localStorage.getItem('anonynmous-azonta-user')
    //if there is an authenticated user get the cart and the likes  
    if(user){
        
        cart = user.cart ? user.cart : 0
        likes = user.likes ?  user.likes : 0
        userData = user;
    }
    // if there is no authenticated user, get the user data for anonynmous user from localstorage
    else if(anonynmousUser){
        cart = anonynmousUser.cart
        likes = anonynmousUser.cart
        userData = anonynmousUser;
    }

    

    return {type: FETCH_USER, payload: {userData, likes, cart}}
}

export const switchActiveLink = clickedLink => {
    return {type: SWITCH_ACTIVE_LINK, payload: clickedLink}
}

export const toggleViewType = viewType => {
    return {type: TOGGLE_VIEW_TYPE, payload: viewType}
}

export const initiateRegistration = () => {
    return {type: INITIAL_REGISTRATION, payload: ''}
}

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
                axios.defaults.headers.common['x-access-token'] = response.data.token

                if(JSON.parse(localStorage.getItem('userRegDetails').extendedUserType !== 'user')){
                    localStorage.removeItem('userRegDetails')
                    return window.location.href = window.origin + '/users/securityquestions'
                }
                return window.location.href = window.origin + '/users/profile'
           }
        }catch(error) {
            if(error.response.status === 498){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Email and passcode mismatch'})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'some errors were encountered'})
        }
    }
}
 
export const resendEmail = emailAddress => {
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
            console.log('eror', error.message)
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
            if(error.response.status === 404 || error.response.status === 400){
                return dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: error.response.data.message})
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'some errors were encountered, please try again'})
        }
    }
}