import {errorModalService} from "../../../services/modal/errorModalService";
import {axiosClient} from "../../../utils/axiosClient";
import {GET_MIN_ORDER, GET_ROULETTE_GAME, GET_ROULETTE_RESULT, UPDATE_ROULETTE} from "../actionTypes";

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
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getRouletteGameSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load roulette game', e.response?.status || 404)
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
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getMinOrderSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load minimal order price', e.response?.status || 404)
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

export function makeRouletteBet(token, data) {
    return async () => {
        try {
            const response = await axiosClient.post('/Roulette/MakeBet', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            }
        } catch (e) {
            errorModalService('Cannot make a bet', e.response?.status || 404)
        }
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