import {axiosClient} from "../../../utils/axiosClient";
import {
    GET_AVATAR,
    GET_NICKNAME_VISIBILITY, GET_PROFILE_INFO, GET_REFERRAL_LINK,
    GET_REFERRALS,
    GET_REFERRALS_STATISTIC,
    GET_USER_STATS
} from "../actionTypes";
import {errorModalService} from "../../../services/modal/errorModalService";
import {modalService} from "../../../services/modal/modalService";

export function getProfileInfo(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetProfileInfo', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getProfileInfoSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load profile info', e.response?.status || null)
        }
    }
}

export function getAvatar(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetAvatarUrl', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getAvatarSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load avatar', e.response?.status || null)
        }
    }
}

export function uploadAvatar(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Profile/UploadAvatar', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response) {
                errorModalService('Upload avatar error', response.data.status)
            }
        } catch (e) {
            errorModalService('Cannot upload avatar', e.response?.status || null)
        }
    }
}

export function getUserStats(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetCurrentUserStats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getUserStatsSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load user statistics', e.response?.status || null)
        }
    }
}
export function getNicknameVisibility(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/IsNicknameHidden', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getNicknameVisibilitySuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load nickname params', e.response?.status || null)
        }
    }
}

export function changeNickname(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.patch('/Profile/ChangeNickname', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            }
        } catch (e) {
            errorModalService('Cannot change nickname', e.response?.status || null)
        }
    }
}

export function changeEmail(token, data) {
    return async () => {
        try {
            const response = await axiosClient.put('/Profile/ChangeEmail', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            }

        } catch (e) {
            errorModalService('Cannot change email', e.response?.status || null)
        }
    }
}

export function confirmEmail(token, data) {

    console.log(data)

    return async () => {
        try {
            const response = await axiosClient.patch('/Profile/ConfirmEmail', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                modalService('info', 'Email changed successfully', {
                    title: 'Success',
                    buttons: [
                        {
                            value: false,
                            text: 'Close',
                            light: true
                        }
                    ]
                })
            }

        } catch (e) {
            errorModalService('Cannot change email', e.response?.status || null)
        }
    }
}

export function changePassword(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/Auth/ChangePassword', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            }
        } catch (e) {
            errorModalService('Cannot change email', e.response?.status || null)
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
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                getReferralsSuccess(response.data.payload.data, response.data.payload.count)
            }

        } catch (e) {
            errorModalService('Cannot load referrals', e.response?.status || null)
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
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getReferralsStatisticSuccess(response.data.payload))
            }

        } catch (e) {
            errorModalService('Cannot load referrals statistics', e.response?.status || null)
        }
    }
}

export function getReferralLink(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/GetReferalNumber', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getReferralLinkSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load referral link', e.response?.status || null)
        }
    }
}

export function getProfileInfoSuccess(profileInfo) {
    return {
        type: GET_PROFILE_INFO,
        profileInfo
    }
}

export function getAvatarSuccess(avatar) {
    return {
        type: GET_AVATAR,
        avatar
    }
}

export function getUserStatsSuccess(statistic) {
    return {
        type: GET_USER_STATS,
        statistic
    }
}

export function getReferralsSuccess(referrals, referralsCount) {
    return {
        type: GET_REFERRALS,
        referrals,
        referralsCount
    }
}

export function getReferralsStatisticSuccess(statistic) {
    return {
        type: GET_REFERRALS_STATISTIC,
        statistic
    }
}

export function getNicknameVisibilitySuccess(nicknameVisibility) {
    return {
        type: GET_NICKNAME_VISIBILITY,
        nicknameVisibility
    }
}

export function getReferralLinkSuccess(referralLink) {
    return {
        type: GET_REFERRAL_LINK,
        referralLink
    }
}