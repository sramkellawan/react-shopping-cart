import {legacy_createStore, applyMiddleware, compose,  combineReducers} from "redux";
import thunk  from "redux-thunk";
import { productsReducer } from "./actions/reducers/productReducers";

const initialState = {};
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = legacy_createStore(combineReducers({
    products: productsReducer,
}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;