import { combineReducers } from 'redux';
import homeReducer from "./homeReducer";
import registerationReducer from "./registerationReducer";

export default combineReducers({
    home: homeReducer,
    reg: registerationReducer
})