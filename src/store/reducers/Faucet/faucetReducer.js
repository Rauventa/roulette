import {GET_FAUCET_HISTORY, GET_FAUCET_TIMEOUT, GET_FAUCET_WINS, ROLL_FAUCET} from "../../actions/actionTypes";

const initialState = {
    history: [],
    wins: [],
    timeout: 0,
    winData: {number:9999, gain: 0}
}

export default function faucetReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FAUCET_HISTORY:
            return {
                ...state,
                history: action.history
            }
        case GET_FAUCET_WINS:
            return {
                ...state,
                wins: action.wins
            }
        case GET_FAUCET_TIMEOUT:
            return {
                ...state,
                timeout: action.timeout
            }
        case ROLL_FAUCET:
            return {
                ...state,
                winData: action.winData
            }
        default:
            return state
    }
}