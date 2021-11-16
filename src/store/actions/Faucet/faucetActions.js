import {axiosClient} from "../../../utils/axiosClient";
import {GET_FAUCET_HISTORY, GET_FAUCET_TIMEOUT, GET_FAUCET_WINS, ROLL_FAUCET} from "../actionTypes";
import {getBalance} from "../Balance/balanceActions";
import {updateInformer} from "../Application/applicationActions";

export function getFaucetHistory(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetLastFaucetPayments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response?.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getFaucetHistorySuccess(response.data.payload))
            }

        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function getFaucetWins(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Faucet/GetWinTable', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response?.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getFaucetWinsSuccess(response.data.payload))
            }

        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function getFaucetTimeout(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Faucet/GetMinutesBeforeNextRoll', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data.payload)

            if (response?.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {

                const timeout = response.data.payload?.minutes * 60 + response.data.payload?.seconds

                dispatch(getFaucetTimeoutSuccess(timeout))
            }

        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function rollFaucet(token, currency, rate) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Faucet/Roll', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            dispatch(rollFaucetSuccess({number: response.data.payload.winNumber, gain: response.data.payload.gain }))
            dispatch(getFaucetTimeout(token))
            dispatch(getFaucetHistory(token))
            dispatch(getBalance(token, rate))

        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
        
    }
}

export function getFaucetHistorySuccess(history) {
    return {
        type: GET_FAUCET_HISTORY,
        history
    }
}

export function getFaucetWinsSuccess(wins) {
    return {
        type: GET_FAUCET_WINS,
        wins
    }
}

export function getFaucetTimeoutSuccess(timeout) {
    return {
        type: GET_FAUCET_TIMEOUT,
        timeout
    }
}

export function rollFaucetSuccess(winData) {
    return {
        type: ROLL_FAUCET,
        winData
    }
}