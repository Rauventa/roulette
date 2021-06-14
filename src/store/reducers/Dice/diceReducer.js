import {GET_DICE_HASH} from "../../actions/actionTypes";

const initialState = {
    hash: ''
};

export default function diceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DICE_HASH:
            return {
                ...state,
                hash: action.hash
            }
        default:
            return state
    }
}