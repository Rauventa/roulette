import {axiosClient} from "../../../utils/axiosClient";
import {GET_HILO_HASH, GET_HILO_HISTORY, START_HILO_SUCCESS} from "../actionTypes";
import {config} from "../../../config/config";
import {gameModalService} from "../../../services/modal/gameModalService";
import {updateInformer} from "../Application/applicationActions";

export function getHiloHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/HiLo/GetCurrentGameData', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getHiloHashSuccess(response.data.payload.hash, response.data.payload.gameNumber))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
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
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(startHiloSuccess({...response.data.payload, lastHash: hash}))
                gameModalService('hilo-game', {...response.data.payload, lastHash: hash})
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
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
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
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