import axios from "axios";
import { SET_INVITE_ID, SET_ADDRESS_DATA,  GET_ERRORS, GET_SITEDATA_FROM_API} from "./types";

// export const actionSetInitialState = data =>{
//   return dispatch => {
//     dispatch({
//       type: SET_INITIAL_STATE,
//       payload: data,
//     })
//   }
// }
export const getSiteDataAction = (data) =>{
  return dispatch => {
    dispatch({
      type: GET_SITEDATA_FROM_API, 
      payload: data,
    })
  }
}

export const actionSetUserData = data =>{
  return dispatch => {
    dispatch({
      type: SET_ADDRESS_DATA,
      payload: data,
    })
  }
}

export const actionSetInviteID = data =>{
  return dispatch => {
    dispatch({
      type: SET_INVITE_ID,
      payload: data,
    })
  }
}