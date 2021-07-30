import {axiosClient} from "../../../utils/axiosClient";
import {GET_DICE_HASH, GET_DICE_HISTORY, START_DICE_SUCCESS} from "../actionTypes";
import {updateErrorHandler} from "../Errors/ErrorActions";
import {openModalHandler} from "../Modal/modalActions";
import {getRating, getStats} from "../Stats/statsActions";

export function getDiceHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Dice/GetCurrentGameData', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateErrorHandler('Cannot load hash', response.data.status))
            } else {
                dispatch(getDiceHashSuccess(response.data.payload.hash, response.data.payload.gameNumber))
            }
        } catch (e) {
            dispatch(updateErrorHandler('Cannot load hash', e.response?.status || null))
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
                dispatch(updateErrorHandler(response.data.errors[0], response.data.status))
            } else {
                dispatch(startDiceSuccess({...response.data.payload, ownNumber, lastHash: hash}))
                dispatch(openModalHandler())
            }

        } catch (e) {
            dispatch(updateErrorHandler('Dice game load error', e.response.status))
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
                    pageSize: data.pageSize,
                    pageNumber: data.pageNumber,
                    onlyMe: data.onlyMe
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data.errors[0], response.data.status))
            } else {
                dispatch(getDiceHistorySuccess(response.data.payload.data.reverse()))
            }
        } catch (e) {
            dispatch(updateErrorHandler('Dice game load error', 500))
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