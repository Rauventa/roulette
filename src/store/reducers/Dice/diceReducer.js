import {GET_DICE_HASH, GET_DICE_HISTORY, START_DICE_SUCCESS} from "../../actions/actionTypes";

const initialState = {
    hash: '',
    result: {},
    history: [],
    gameNumber: 0
};

export default function diceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DICE_HASH:
            return {
                ...state,
                hash: action.hash,
                gameNumber: action.gameNumber
            }
        case START_DICE_SUCCESS:
            return {
                ...state,
                result: action.result,
                hash: action.result.hashForNextGame,
                gameNumber: action.result.gameNumber + 1
            }
        case GET_DICE_HISTORY:
            return {
                ...state,
                history: action.history
            }
        default:
            return state
    }
}