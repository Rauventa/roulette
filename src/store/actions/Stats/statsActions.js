import {axiosClient} from "../../../utils/axiosClient";
import {updateErrorHandler} from "../Errors/ErrorActions";
import {GET_STATS} from "../actionTypes";

export function getStats(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetAllUsersStats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data.errors[0], response.data.status))
            } else {
                dispatch(getStatsSuccess(response.data.payload))
            }
        } catch (e) {
            dispatch(updateErrorHandler('Stats load error', e.response?.status || null))
        }
    }
}

export function getStatsSuccess(stats) {
    return {
        type: GET_STATS,
        stats
    }
}