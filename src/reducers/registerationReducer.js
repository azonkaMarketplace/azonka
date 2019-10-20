import { SUCCESSFUL_REGISTRATION,INITIAL_REGISTRATION, UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR } from "../actions/types";
const INITIAL_STATE = {loading: false, error: null}

export default (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case INITIAL_REGISTRATION:
                return {...state, loading:true, error: null}
        case SUCCESSFUL_REGISTRATION:
            return {...state, loading:false}
        case UNSUCCESSFUL_REGISTRATION:
            return {...state, loading: false, error: actions.payload}
        case CLEAR_ERROR:
            return {...state, error: null}
        default: 
            return {...state}
    }
}