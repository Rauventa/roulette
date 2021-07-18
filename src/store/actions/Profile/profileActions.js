import {updateErrorHandler} from "../Errors/ErrorActions";
import {axiosClient} from "../../../utils/axiosClient";
import {GET_REFERRALS, GET_REFERRALS_STATISTIC} from "../actionTypes";

export function uploadAvatar(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Profile/UploadAvatar', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                dispatch(updateErrorHandler('Upload avatar error', response.data.status))
            }
        } catch (e) {
            dispatch(updateErrorHandler('Cannot upload avatar', e.response?.status || null))
        }
    }
}

export function getReferrals(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetReferals', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data?.errors[0], response.data.status))
            } else {
                dispatch(getReferralsSuccess(response.data.payload))
            }

        } catch (e) {
            dispatch(updateErrorHandler('Cannot load referrals', e.response?.status || null))
        }
    }
}

export function getReferralsStatistic(token, owner) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetReferalsStatistics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    ownerId: owner
                }
            })

            if (response.data?.errors?.length) {
                dispatch(updateErrorHandler(response.data?.errors[0], response.data.status))
            } else {
                dispatch(getReferralsStatisticSuccess(response.data.payload))
            }

        } catch (e) {
            dispatch(updateErrorHandler('Cannot load referrals statistics', e.response?.status || null))
        }
    }
}

export function getReferralsSuccess(referrals) {
    return {
        type: GET_REFERRALS,
        referrals
    }
}

export function getReferralsStatisticSuccess(statistic) {
    return {
        type: GET_REFERRALS_STATISTIC,
        statistic
    }
}