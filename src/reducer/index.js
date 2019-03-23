import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';

const rootReducer = combineReducers({
  navbarPanel,
  orders
});

export default rootReducer;
