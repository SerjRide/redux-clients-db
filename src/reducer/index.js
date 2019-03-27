import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';
import alert from './alert';
import ordersFilter from './orders-filter';

const rootReducer = combineReducers({
  navbarPanel,
  orders,
  alert,
  ordersFilter
});

export default rootReducer;
