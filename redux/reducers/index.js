import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import commonReducer from "@/redux/reducers/commonReducer";
import entryReducer from "@/redux/reducers/entryReducer";

const rootReducer = combineReducers({
    common: commonReducer,
    todo: todoReducer,
    entry: entryReducer
})

export default rootReducer