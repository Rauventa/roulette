import {
    GET_AVATAR,
    GET_NICKNAME_VISIBILITY,
    GET_REFERRALS,
    GET_REFERRALS_STATISTIC,
    GET_USER_STATS
} from "../../actions/actionTypes";

const initialState = {
    userStats: [],
    referrals: [],
    referralStats: [],
    nicknameVisibility: false,
    avatar: null
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
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
                referrals: action.referrals
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
        default:
            return state
    }
}