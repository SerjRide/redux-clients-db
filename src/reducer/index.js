import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';
import alert from './alert';

const rootReducer = combineReducers({
  navbarPanel,
  orders,
  alert
});

export default rootReducer;
