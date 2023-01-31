import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './CommonFeatures/Redux/Reducers/UserReducer';
const rootReducer = combineReducers({
  UserReducer: UserReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
