import {GET_DICE_HASH, START_DICE_SUCCESS} from "../../actions/actionTypes";

const initialState = {
    hash: '',
    result: {}
};

export default function diceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DICE_HASH:
            return {
                ...state,
                hash: action.hash
            }
        case START_DICE_SUCCESS:
            return {
                ...state,
                result: action.result,
                hash: action.result.hashForNextGame
            }
        default:
            return state
    }
}