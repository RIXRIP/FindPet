import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import animalsDataReducer from "./new-animal-reducer";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import mapReducer from "./map-reducer";

let reducers = combineReducers({
    animalsData: animalsDataReducer,
    usersData: userReducer,
    auth: authReducer,
    map:mapReducer
});
let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;