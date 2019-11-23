import { ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING, PRODUCTS_FETCED_SUCCESSFULLY, EDIT_ITEM, INIT_FORM } from "../actions/types";
const INTIAL_STATE = {
    stores: [],
    subCategories: [],
    categories: [],
    resetForm: false,
    products: [],
    product: null
}

export default (state= INTIAL_STATE, actions) => {
    switch(actions.type){
        case ITEMS_FETCHED_SUCCESSFULLY:
            const {stores, categories, subCategories} = actions.payload;
            return {...state, stores, categories, subCategories, resetForm: false}
        case STOP_LOADING:
            return {...state, resetForm: true}
        case PRODUCTS_FETCED_SUCCESSFULLY:
            return {...state, products: actions.payload}
        case EDIT_ITEM:
            
            return {...state, product: {...actions.payload}}
        case INIT_FORM:
            return {...state,product: null}
        default: 
            return {...state}
    }
}