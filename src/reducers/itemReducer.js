import { ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING } from "../actions/types";
const INTIAL_STATE = {
    stores: [],
    subCategories: [],
    categories: [],
    resetForm: false
}

export default (state= INTIAL_STATE, actions) => {
    switch(actions.type){
        case ITEMS_FETCHED_SUCCESSFULLY:
            const {stores, categories, subCategories} = actions.payload;
            return {...state, stores, categories, subCategories, resetForm: false}
        case STOP_LOADING:
            return {...state, resetForm: true}
        default: 
            return {...state}
    }
}