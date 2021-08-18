import {errorModalService} from "../../../services/modal/errorModalService";
import {axiosClient} from "../../../utils/axiosClient";
import {GET_FAUCET_HISTORY, GET_FAUCET_TIMEOUT, GET_FAUCET_WINS} from "../actionTypes";

export function getFaucetHistory(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetLastFaucetPayments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response?.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getFaucetHistorySuccess(response.data.payload))
            }

        } catch (e) {
            errorModalService('Faucet history load error', e.response.status)
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
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getFaucetWinsSuccess(response.data.payload))
            }

        } catch (e) {
            errorModalService('Faucet params load error', e.response.status)
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

            if (response?.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {

                const timeout = response.data.payload?.minutes * 60 + response.data.payload?.seconds

                dispatch(getFaucetTimeoutSuccess(timeout))
            }

        } catch (e) {
            errorModalService('Faucet timeout load error', e.response.status)
        }
    }
}

export function rollFaucet(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Faucet/Roll', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data)

            if (response?.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {

            }

        } catch (e) {
            errorModalService('Faucet timeout load error', e.response.status)
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