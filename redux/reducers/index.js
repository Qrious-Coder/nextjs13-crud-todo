import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import commonReducer from "@/redux/reducers/commonReducer";

const rootReducer = combineReducers({
    common: commonReducer,
    todo: todoReducer,
})

export default rootReducer