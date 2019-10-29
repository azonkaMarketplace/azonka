import { GET_BANKS, GET_SAVED_ACCOUNTS, ACCOUNT_ADDED_SUCCESSFULLY, CLOSE_SNACKBAR } from "../actions/types";

const INITIATL_STATE = {
    banks: [], savedBanks: [],
    loading: false,verified:null, error: null,errorMessage: null,
     user: null, questions:{}, successMessage: null, showSuccessBar: null
}
export default (state=INITIATL_STATE , actions) => {


    switch(actions.type){
        case GET_BANKS:
            return {...state, banks: actions.payload}
        case GET_SAVED_ACCOUNTS: 
            return {...state, savedBanks: actions.payload}
        case ACCOUNT_ADDED_SUCCESSFULLY:
            return {...state, savedBanks: actions.payload, 
                showSuccessBar: true, successMessage:'Account added successfully'}
        case CLOSE_SNACKBAR:
                return {...state, error: null, errorMessage:null, showSuccessBar: null}
        default:
            return {...state}
    }
}