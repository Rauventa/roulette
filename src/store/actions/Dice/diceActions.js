import {axiosClient} from "../../../utils/axiosClient";
import {GET_DICE_HASH, START_DICE_SUCCESS} from "../actionTypes";
import {updateErrorHandler} from "../Errors/ErrorActions";
import {openModalHandler} from "../Modal/modalActions";

export function getDiceHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Dice/GetDiceHashAndCurrentComission', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateErrorHandler('Cannot load hash', response.data.status))
            } else {
                dispatch(getDiceHashSuccess(response.data.payload.hash))
            }
        } catch (e) {
            dispatch(updateErrorHandler('Cannot load hash', e.response.status))
        }
    }
}

export function startDice(token, data, ownNumber) {
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
                dispatch(startDiceSuccess({...response.data.payload, ownNumber}))
                dispatch(openModalHandler())
            }

        } catch (e) {
            dispatch(updateErrorHandler('Dice game load error', e.response.status))
        }
    }
}

export function getDiceHashSuccess(hash) {
    return {
        type: GET_DICE_HASH,
        hash
    }
}

export function startDiceSuccess(result) {
    return {
        type: START_DICE_SUCCESS,
        result
    }
}