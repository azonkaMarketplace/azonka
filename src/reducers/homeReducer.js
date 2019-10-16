import { FETCH_USER } from "../actions/types";
const INITIATL_STATE = {currentUser: null, carts: 0, likes: 0}

export default (state=INITIATL_STATE , actions) => {
    switch(actions.type){
        case FETCH_USER:
            const {userData, cart, likes} = actions.payload
            return {...state, currentUser: userData, likes, cart}
        default:
            return  {...state}
    }
}