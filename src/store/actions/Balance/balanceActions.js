import {axiosClient} from "../../../utils/axiosClient";
import {CHANGE_CURRENCY, GET_BTC_BALANCE, GET_PAYMENT_HISTORY, GET_USD_BALANCE, GET_WALLETS} from "../actionTypes";
import {updateErrorHandler} from "../Errors/ErrorActions";
import {getDiceHistorySuccess} from "../Dice/diceActions";

export function changeCurrency(ticker) {
    return {
        type: CHANGE_CURRENCY,
        currency: ticker
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
            dispatch(updateErrorHandler('Balance load error', e.response?.status || null))
        }
    }
}

export function createWallet(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Profile/AddWallet', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data?.errors[0], response.data.status))
            } else {
                return response.data.success
            }

        } catch (e) {
            dispatch(updateErrorHandler('Wallet create error', e.response?.status || null))
        }
    }
}

export function getWallets(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetWithdrawWallets', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler('Wallets load error', response.data.status))
            } else {
                dispatch(getWalletsSuccess(response.data.payload))
            }

        } catch (e) {
            dispatch(updateErrorHandler('Wallets load error', e.response?.status || null))
        }
    }
}

export function deleteWallet(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.delete(`/Profile/DeleteWalletAddress`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    address: data
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data?.errors[0], response.data.status))
            } else {
                return response.data.success
            }

        } catch (e) {
            dispatch(updateErrorHandler('Delete wallet error', e.response?.status || null))
        }
    }
}

export function createWithdraw(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/CoinsPaid/WithdrawalRequest', data,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (e) {
            dispatch(updateErrorHandler('Create withdraw error', e.response.status))
        }
    }
}

export function getPaymentHistory(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Payments/GetTransactionsHistory',{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    ...data
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data.errors[0], response.data.status))
            } else {
                dispatch(getPaymentHistorySuccess(response.data.payload.data))
            }

        } catch (e) {
            dispatch(updateErrorHandler('Payment history load error', e.response.status))
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

export function getWalletsSuccess(wallets) {
    return {
        type: GET_WALLETS,
        wallets
    }
}

export function getPaymentHistorySuccess(history) {
    return {
        type: GET_PAYMENT_HISTORY,
        history
    }
}