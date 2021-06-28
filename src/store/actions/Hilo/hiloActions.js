import {axiosClient} from "../../../utils/axiosClient";
import {updateErrorHandler} from "../Errors/ErrorActions";
import {GET_HILO_HASH, START_HILO_SUCCESS} from "../actionTypes";
import {openModalHandler} from "../Modal/modalActions";

export function getHiloHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/HiLo/GetCurrentHashAndCurrentComission', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateErrorHandler('Cannot load hash', response.data.status))
            } else {
                dispatch(getHiloHashSuccess(response.data.payload.hash))
            }
        } catch (e) {
            console.log(e)
            dispatch(updateErrorHandler('Cannot load hash', e.response?.status || null))
        }
    }
}

export function startHilo(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/HiLo/CheckHiLoResult', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data.errors[0], response.data.status))
            } else {
                dispatch(startHiloSuccess(response.data.payload))
                dispatch(openModalHandler())
            }
        } catch (e) {
            dispatch(updateErrorHandler('Hilo game load error', e.response?.status || null))
        }
    }
}

export function getHiloHashSuccess(hash) {
    return {
        type: GET_HILO_HASH,
        hash
    }
}

export function startHiloSuccess(result) {
    return {
        type: START_HILO_SUCCESS,
        result
    }
}