import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';
import alert from './alert';
import period from './period';

const rootReducer = combineReducers({
  navbarPanel,
  orders,
  alert,
  period
});

export default rootReducer;
