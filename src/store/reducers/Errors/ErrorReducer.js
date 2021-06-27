import {UPDATE_ERROR_MESSAGE} from "../../actions/actionTypes";

const initialState = {
    errorMessage: 'Connection lost',
    status: null
};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage,
                status: action.status
            }
        default:
            return state
    }
}