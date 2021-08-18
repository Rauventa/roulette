import {GET_FAUCET_HISTORY, GET_FAUCET_TIMEOUT, GET_FAUCET_WINS} from "../../actions/actionTypes";

const initialState = {
    history: [],
    wins: [],
    timeout: 0
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
        default:
            return state
    }
}