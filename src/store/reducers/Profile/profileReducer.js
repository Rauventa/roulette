import {GET_REFERRALS, GET_REFERRALS_STATISTIC} from "../../actions/actionTypes";

const initialState = {
    referrals: [],
    statistic: []
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REFERRALS:
            return {
                ...state,
                referrals: action.referrals
            }
        case GET_REFERRALS_STATISTIC:
            return {
                ...state,
                statistic: action.statistic
            }
        default:
            return state
    }
}