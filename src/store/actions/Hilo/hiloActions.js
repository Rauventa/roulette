import {axiosClient} from "../../../utils/axiosClient";
import {GET_HILO_HASH, GET_HILO_HISTORY, START_HILO_SUCCESS} from "../actionTypes";
import {config} from "../../../config/config";
import {errorModalService} from "../../../services/modal/errorModalService";
import {gameModalService} from "../../../services/modal/gameModalService";

export function getHiloHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/HiLo/GetCurrentGameData', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                errorModalService('Cannot load hash', response.data.status)
            } else {
                dispatch(getHiloHashSuccess(response.data.payload.hash, response.data.payload.gameNumber))
            }
        } catch (e) {
            console.log(e)
            errorModalService('Cannot load hash', e.response?.status || null)
        }
    }
}

export function startHilo(token, data, hash) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/HiLo/CheckHiLoResult', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(startHiloSuccess({...response.data.payload, lastHash: hash}))
                gameModalService('hilo-game', {...response.data.payload, lastHash: hash})
            }
        } catch (e) {
            errorModalService('Hilo game load error', e.response?.status || null)
        }
    }
}

export function getHiloHistory(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetHiloHistory', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    ...config.historyLoadParams,
                    onlyMe: data.onlyMe
                }
            })

            dispatch(getHiloHistorySuccess(response.data.payload.data.reverse()))
        } catch (e) {
            errorModalService('Dice game load error', 500)
        }
    }
}

export function getHiloHashSuccess(hash,gameNumber) {
    return {
        type: GET_HILO_HASH,
        hash,
        gameNumber
    }
}

export function startHiloSuccess(result) {
    return {
        type: START_HILO_SUCCESS,
        result
    }
}

export function getHiloHistorySuccess(history) {
    return {
        type: GET_HILO_HISTORY,
        history
    }
}