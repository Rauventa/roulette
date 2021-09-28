import {
    GET_AVATAR, GET_MESSAGES,
    GET_NICKNAME_VISIBILITY, GET_PROFILE_INFO, GET_REFERRAL_LINK,
    GET_REFERRALS,
    GET_REFERRALS_STATISTIC,
    GET_USER_STATS
} from "../../actions/actionTypes";

const initialState = {
    profileInfo: {},
    userStats: [],
    referrals: [],
    referralsCount: null,
    referralStats: [],
    nicknameVisibility: false,
    avatar: null,
    referralLink: null,
    messages: []
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        case GET_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            }
        case GET_USER_STATS:
            return {
                ...state,
                userStats: action.statistic
            }
        case GET_REFERRALS:
            return {
                ...state,
                referrals: action.referrals,
                referralsCount: action.referralsCount
            }
        case GET_REFERRALS_STATISTIC:
            return {
                ...state,
                referralStats: action.statistic
            }
        case GET_NICKNAME_VISIBILITY:
            return {
                ...state,
                nicknameVisibility: action.nicknameVisibility
            }
        case GET_REFERRAL_LINK:
            return {
                ...state,
                referralLink: action.referralLink
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state
    }
}