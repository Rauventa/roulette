import {axiosClient} from "../../../utils/axiosClient";
import {GET_RATING, GET_STATS, UPDATE_STATS} from "../actionTypes";
import {updateInformer} from "../Application/applicationActions";

export function getStats(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetAllUsersStats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getStatsSuccess(response.data.payload))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
        }
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
                dispatch(updateInformer({message: response.data.errors[0], active: true, type: 'error'}))
            } else {
                dispatch(getRatingSuccess(response.data.payload))
            }
        } catch (e) {
            dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
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

export function getRatingSuccess(rating) {
    return {
        type: GET_RATING,
        rating
    }
}