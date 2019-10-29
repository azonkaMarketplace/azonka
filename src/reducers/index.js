import { combineReducers } from 'redux';
import homeReducer from "./homeReducer";
import registerationReducer from "./registerationReducer";
import bankReducer from "./bankReducer";

export default combineReducers({
    home: homeReducer,
    reg: registerationReducer,
    bank: bankReducer
})