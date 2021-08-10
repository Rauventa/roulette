import {GET_FAUCET_HISTORY} from "../../actions/actionTypes";

const initialState = {
    history: []
}

export default function faucetReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FAUCET_HISTORY:
            return {
                ...state,
                history: action.history
            }
        default:
            return state
    }
}