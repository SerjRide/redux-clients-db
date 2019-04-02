import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';
import customers from './customers';
import alert from './alert';
import filter from './filter';
import modal from './modal';
import token from './token';

const rootReducer = combineReducers({
  navbarPanel,
  orders,
  alert,
  filter,
  customers,
  modal,
  token
});

export default rootReducer;
