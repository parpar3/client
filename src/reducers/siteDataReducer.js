import { GET_SITEDATA_FROM_API } from "../actions/types";

export default function( state = {}, action) {

    switch (action.type) {
        case GET_SITEDATA_FROM_API:
            return action.payload;
        default: 
            return state;
    }
}
