import { FETCH_USER, SWITCH_ACTIVE_LINK, TOGGLE_VIEW_TYPE, LOGOUT_USER } from "../actions/types";
const INITIATL_STATE = {currentUser: null, 
    cart: 0, likes: 0, homeActiveLink:'profile', viewType: 'grid'}

export default (state=INITIATL_STATE , actions) => {
    switch(actions.type){
        case FETCH_USER:
            const {userData, cart, likes} = actions.payload
            return {...state, currentUser: userData, likes, cart }
        case SWITCH_ACTIVE_LINK:
            return {...state, homeActiveLink: actions.payload}
        case TOGGLE_VIEW_TYPE: 
            return {...state, viewType: actions.payload}
        case LOGOUT_USER:
            return {...state, currentUser: null}
        default:
            return  {...state}
    }
}