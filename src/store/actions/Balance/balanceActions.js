import {axiosClient} from "../../../utils/axiosClient";
import {CHANGE_CURRENCY, GET_BTC_BALANCE, GET_USD_BALANCE} from "../actionTypes";

export function changeCurrency(ticker) {

    let currency = 'btc'

    if (ticker === 'btc') {
        currency = 'usd'
    }

    return {
        type: CHANGE_CURRENCY,
        currency
    }
}

export function getBalance(token, rate) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetBalanceInBTC', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            dispatch(getBtcBalance(response.data.payload))

            const usdValue = response.data.payload * rate

            dispatch(getUsdBalance(usdValue))

        } catch (e) {
            console.log(e)
        }
    }
}

export function getBtcBalance(balanceBtc) {
    return {
        type: GET_BTC_BALANCE,
        balanceBtc
    }
}

export function getUsdBalance(balanceUsd) {
    return {
        type: GET_USD_BALANCE,
        balanceUsd
    }
}