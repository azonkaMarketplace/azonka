import { FETCH_USER, SWITCH_ACTIVE_LINK } from "../actions/types";
const INITIATL_STATE = {currentUser: null, 
    cart: 0, likes: 0, homeActiveLink:'profile'}

export default (state=INITIATL_STATE , actions) => {
    switch(actions.type){
        case FETCH_USER:
            const {userData, cart, likes} = actions.payload
            return {...state, currentUser: userData, likes, cart }
        case SWITCH_ACTIVE_LINK:
            return {...state, homeActiveLink: actions.payload}
        default:
            return  {...state}
    }
}