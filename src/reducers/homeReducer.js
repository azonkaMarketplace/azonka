import { FETCH_USER, SWITCH_ACTIVE_LINK, TOGGLE_VIEW_TYPE, LOGOUT_USER,
     CLOSE_SNACKBAR, UPDATE_ACCOUNT } from "../actions/types";
const INITIATL_STATE = {currentUser: null, 
    cart: 0, likes: 0, homeActiveLink:'profile', viewType: 'grid', showSuccessBar:null, message:'Updated Successfully'}

export default (state=INITIATL_STATE , actions) => {
    
    switch(actions.type){
        case FETCH_USER:
            const {userData, cart, likes} = actions.payload
            return {...state, currentUser: userData, likes, cart}
        case UPDATE_ACCOUNT:
            return {...state, currentUser: actions.payload.userData,
                 likes: actions.payload.likes, cart:actions.payload.cart, showSuccessBar: true }
        case SWITCH_ACTIVE_LINK:
            return {...state, homeActiveLink: actions.payload}
        case TOGGLE_VIEW_TYPE: 
            return {...state, viewType: actions.payload}
        case LOGOUT_USER:
            return {...state, currentUser: null}
        case CLOSE_SNACKBAR:
            return {...state, showSuccessBar: false}
        default:
            return  {...state}
    }
}