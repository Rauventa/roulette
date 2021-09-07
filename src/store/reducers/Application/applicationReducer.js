import {LOADER_VISIBILITY} from "../../actions/actionTypes";

const initialState = {
    loader: false
};

export default function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_VISIBILITY:
            return {
                ...state,
                loader: action.loader
            }
        default:
            return state
    }
}