import {GET_STATS} from "../../actions/actionTypes";

const initialState = {
    stats: {}
};

export default function statsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATS:
            return {
                ...state,
                stats: action.stats
            }
        default:
            return state
    }
}