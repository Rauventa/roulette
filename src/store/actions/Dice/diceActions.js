import {axiosClient} from "../../../utils/axiosClient";
import {GET_DICE_HASH, START_DICE_SUCCESS} from "../actionTypes";

export function getDiceHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Dice/GetDiceHash', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            dispatch(getDiceHashSuccess(response.data.payload))
        } catch (e) {
            console.log(e)
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

            dispatch(startDiceSuccess({...response.data.payload, ownNumber}))
        } catch (e) {
            console.log(e)
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