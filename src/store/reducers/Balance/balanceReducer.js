import {CHANGE_CURRENCY, GET_BTC_BALANCE, GET_USD_BALANCE} from "../../actions/actionTypes";

const initialState = {
    currency: 'btc',
    balanceBtc: null,
    balanceUsd: null,
    rate: 31555.5
};

export default function balanceReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {
                ...state,
                currency: action.currency
            }
        case GET_BTC_BALANCE:
            return {
                ...state,
                balanceBtc: action.balanceBtc
            }
        case GET_USD_BALANCE:
            return {
                ...state,
                balanceUsd: action.balanceUsd
            }
        default:
            return state
    }
}