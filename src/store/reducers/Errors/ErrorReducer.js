import {UPDATE_ERROR_MESSAGE} from "../../actions/actionTypes";

const initialState = {
    errorMessage: 'Connection lost',
};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}