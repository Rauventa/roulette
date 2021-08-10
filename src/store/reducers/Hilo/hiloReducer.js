import {GET_HILO_HASH, GET_HILO_HISTORY, START_HILO_SUCCESS} from "../../actions/actionTypes";

const initialState = {
    hash: '',
    result: {},
    history: [],
};

export default function hiloReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HILO_HASH:
            return {
                ...state,
                hash: action.hash,
                gameNumber: action.gameNumber
            }
        case START_HILO_SUCCESS:
            return {
                ...state,
                result: action.result,
                hash: action.result.hashForNextGame,
                gameNumber: action.result.gameNumber + 1
            }
        case GET_HILO_HISTORY:
            return {
                ...state,
                history: action.history
            }
        default:
            return state
    }
}