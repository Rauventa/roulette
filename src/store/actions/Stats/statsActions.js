import {axiosClient} from "../../../utils/axiosClient";
import {GET_RATING, GET_STATS, UPDATE_STATS} from "../actionTypes";
import {errorModalService} from "../../../services/modal/errorModalService";

export function getStats(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetAllUsersStats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getStatsSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Stats load error', e.response?.status || null)
        }
    }
}

export function getStatsSuccess(stats) {
    return {
        type: GET_STATS,
        stats
    }
}

export function updateStats(stats) {
    return {
        type: UPDATE_STATS,
        stats
    }
}

export function getRating(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetRating', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getRatingSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Rating load error', e.response?.status || null)
        }
    }
}

export function getRatingSuccess(rating) {
    return {
        type: GET_RATING,
        rating
    }
}