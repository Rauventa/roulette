import {GET_RATING, GET_STATS, UPDATE_STATS} from "../../actions/actionTypes";

const initialState = {
    stats: {},
    rating: []
};

export default function statsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATS:
            return {
                ...state,
                stats: action.stats
            }
        case UPDATE_STATS:
            return {
                ...state,
                stats: action.stats
            }
        case GET_RATING:
            return {
                ...state,
                rating: action.rating
            }
        default:
            return state
    }
}