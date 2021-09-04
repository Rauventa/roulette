import {errorModalService} from "../../../services/modal/errorModalService";
import {axiosClient} from "../../../utils/axiosClient";
import {GET_ROULETTE_GAME} from "../actionTypes";

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

// export function updateRouletteGame(token, data) {
//     return async dispatch => {
//         try {
//             const response = await axiosClient.get('/Roulette/GetActiveGame', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 params: {...data}
//             });
//
//             if (response.data?.errors?.length) {
//                 errorModalService(response.data.errors[0], response.data.status)
//             } else {
//                 dispatch(getRouletteGameSuccess(response.data.payload))
//             }
//         } catch (e) {
//             errorModalService('Cannot load roulette game', e.response?.status || 404)
//         }
//     }
// }

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