import {axiosClient} from "../../../utils/axiosClient";
import {GET_DICE_HASH, GET_DICE_HISTORY, START_DICE_SUCCESS} from "../actionTypes";
import {config} from "../../../config/config";
import {gameModalService} from "../../../services/modal/gameModalService";
import {updateInformer} from "../Application/applicationActions";

export function getDiceHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Dice/GetCurrentGameData', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getDiceHashSuccess(response.data.payload.hash, response.data.payload.gameNumber))
            }
        } catch (e) {
           dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function startDice(token, data, ownNumber, hash) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Dice/CheckDiceResult', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(startDiceSuccess({...response.data.payload, ownNumber, lastHash: hash}))
                gameModalService('dice-game', {...response.data.payload, ownNumber, lastHash: hash})
            }

        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function getDiceHistory(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetDiceHistory', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    ...config.historyLoadParams,
                    onlyMe: data.onlyMe
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getDiceHistorySuccess(response.data.payload.data.reverse()))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function getDiceHashSuccess(hash, gameNumber) {
    return {
        type: GET_DICE_HASH,
        hash,
        gameNumber
    }
}

export function startDiceSuccess(result) {
    return {
        type: START_DICE_SUCCESS,
        result
    }
}

export function getDiceHistorySuccess(history) {
    return {
        type: GET_DICE_HISTORY,
        history
    }
}