import {
    BONUS_BALANCE,
    CHANGE_CURRENCY,
    GET_BTC_BALANCE, GET_CURRENT_RATE,
    GET_PAYMENT_HISTORY, GET_PAYMENT_PROOF,
    GET_USD_BALANCE,
    GET_WALLETS
} from "../../actions/actionTypes";

const initialState = {
    currency: 'btc',
    balanceBtc: null,
    balanceUsd: null,
    bonusBalance: null,
    wallets: [],
    history: [],
    rate: null,
    proofData: []
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
        case BONUS_BALANCE:
            return {
                ...state,
                bonusBalance: action.bonusBalance
            }
        case GET_CURRENT_RATE:
            return {
                ...state,
                rate: action.rate
            }
        case GET_USD_BALANCE:
            return {
                ...state,
                balanceUsd: action.balanceUsd
            }
        case GET_WALLETS:
            return {
                ...state,
                wallets: action.wallets
            }
        case GET_PAYMENT_HISTORY:
            return {
                ...state,
                history: action.history
            }
        case GET_PAYMENT_PROOF:
            return {
                ...state,
                proofData: action.proofData
            }
        default:
            return state
    }
}