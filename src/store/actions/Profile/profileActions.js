import {axiosClient} from "../../../utils/axiosClient";
import {
    GET_AVATAR, GET_CONFIRM_STATUS, GET_CURRENT_2FA, GET_MESSAGES,
    GET_NICKNAME_VISIBILITY, GET_PROFILE_INFO, GET_REFERRAL_LINK,
    GET_REFERRALS,
    GET_REFERRALS_STATISTIC,
    GET_USER_STATS
} from "../actionTypes";
import {errorModalService} from "../../../services/modal/errorModalService";
import {modalService} from "../../../services/modal/modalService";
import {config} from "../../../config/config";

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
    return async () => {
        try {
            const response = await axiosClient.post('/Profile/ChangeNickname', data, {
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
            const response = await axiosClient.post('/Profile/ChangeEmail', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                return response.data.success
            }

        } catch (e) {
            errorModalService('Can not change email', e.response?.status || null)
        }
    }
}

export function confirmEmail(token, data, type) {
    return async () => {
        try {
            const response = await axiosClient.post('/Profile/СonfirmEmail', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                modalService('info', type === 'confirm' ? `Email confirmed successfully` : `Email changed successfully`, {
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

export function changePhone(token, data) {
    return async () => {
        try {
            const response = await axiosClient.post('/Profile/ChangePhone', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                return response.data.success
            }

        } catch (e) {
            errorModalService('Can not change phone', e.response?.status || null)
        }
    }
}

export function confirmPhone(token, data, type) {
    return async () => {
        try {
            const response = await axiosClient.post('/Profile/СonfirmPhone', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                modalService('info', type === 'confirm' ? `Phone confirmed successfully` : `Phone changed successfully`, {
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
            errorModalService('Cannot change phone', e.response?.status || null)
        }
    }
}

export function changePassword(token, data) {
    return async () => {
        try {
            const response = await axiosClient.post('/Auth/ChangePassword', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                modalService('info', 'You have successfully changed your password', {
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

export function getReferrals(token) {
    return async () => {
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

export function getMessages(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Messages/GetMessages', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    ...config.historyLoadParams,
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getMessagesSuccess(response.data.payload.data.reverse()))
            }
        } catch (e) {
            errorModalService('Cannot load support messages', e.response?.status || null)
        }
    }
}

export function sendMessage(token, data) {
    return async () => {
        try {
            const response = await axiosClient.post('/Messages/SendMessage', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            }
        } catch (e) {
            errorModalService('Cannot send message', e.response?.status || null)
        }
    }
}

export function getCurrent2fa(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Profile/Get2FaQrAndCode', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getCurrent2faSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot get your 2FA code', e.response?.status || null)
        }
    }
}

export function confirm2fa(token, data) {
    return async dispatch => {
        try {
            const response = await axiosClient.patch('/Profile/Enable2Fa', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getCurrent2faSuccess(null))
            }
        } catch (e) {
            errorModalService('Cannot confirm your 2FA code', e.response?.status || null)
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

export function getMessagesSuccess(messages) {
    return {
        type: GET_MESSAGES,
        messages
    }
}

export function getCurrent2faSuccess(faCode) {
    return {
        type: GET_CURRENT_2FA,
        faCode
    }
}