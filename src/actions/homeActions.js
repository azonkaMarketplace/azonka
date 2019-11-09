import { FETCH_USER, SWITCH_ACTIVE_LINK,TOGGLE_VIEW_TYPE,INITIAL_REGISTRATION,CLOSE_SNACKBAR,
    SUCCESS_ALERT, DISPLAY_ERROR
 } from "./types";


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

export const closeSnackBar = () => {
    return { type: CLOSE_SNACKBAR, payload: ''}
}

export const renderError = (message = '') => {
    return {type: DISPLAY_ERROR, payload: message}
}

export const showSuccessALert = (message='') => {
    return {type: SUCCESS_ALERT, payload: message}
}

