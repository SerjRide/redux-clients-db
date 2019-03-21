import { combineReducers } from 'redux';
import navbarPanel from './navbar-panel';
import orders from './orders';
import content from './content';

const rootReducer = combineReducers({
  navbarPanel,
  orders,
  content
});

export default rootReducer;
