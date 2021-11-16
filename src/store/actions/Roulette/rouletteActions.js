import {axiosClient} from "../../../utils/axiosClient";
import {GET_MIN_ORDER, GET_ROULETTE_GAME, GET_ROULETTE_RESULT, UPDATE_ROULETTE} from "../actionTypes";
import {updateInformer} from "../Application/applicationActions";

export function getRouletteGame(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Roulette/GetActiveGame', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {...data}
            });

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getRouletteGameSuccess(response.data.payload))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function getMinOrder(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Roulette/GetTicketPrice', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getMinOrderSuccess(response.data.payload))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function makeRouletteBet(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Roulette/MakeBet', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
    }
}

export function updateRouletteGame(gameData) {
    return {
        type: UPDATE_ROULETTE,
        gameData
    }
}

export function getRouletteResult(result) {
    return {
        type: GET_ROULETTE_RESULT,
        result
    }
}

export function getRouletteGameSuccess(gameData) {
    return {
        type: GET_ROULETTE_GAME,
        gameData
    }
}

export function getMinOrderSuccess(minOrder) {
    return {
        type: GET_MIN_ORDER,
        minOrder
    }
}