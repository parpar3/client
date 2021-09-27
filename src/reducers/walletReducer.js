import { SET_ADDRESS_DATA, GET_ADDRESS_DATA,  SET_INVITE_ID} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    userdata: {},
    useraddress: "",
    loading: false
};

export default function( state = initialState, action ){
    switch (action.type) {
        case SET_ADDRESS_DATA:
           
            return {
                ...state,
                isAuthenticated: true, 
                userdata:  action.payload,
                loading: true,
            };
        case GET_ADDRESS_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_INVITE_ID:
            return{
                ...state,
                invite_id: action.payload,
            }
        default:
            return state;
    }
}