import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import walletReducer from "./walletReducer";
import siteDataReducer from "./siteDataReducer";


export default combineReducers({
  sitedata: siteDataReducer, 
  wallet: walletReducer, 
  auth: authReducer,
  errors: errorReducer
});