import {FAQ_QUESTIONS, GET_USER_COUNTRY, LOADER_VISIBILITY, UPDATE_INFORMER, GET_AVIABLE_BONUSES} from "../../actions/actionTypes";

const initialState = {
    loader: false,
    country: 'US',
    faqQuestions: [],
    bonuses: []
    informerData: {
        active: false
    }
};

export default function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_VISIBILITY:
            return {
                ...state,
                loader: action.loader
            }
        case GET_USER_COUNTRY:
            return {
                ...state,
                country: action.country
            }
        case FAQ_QUESTIONS:
            return {
                ...state,
                faqQuestions: action.faqQuestions
            }
        case GET_AVIABLE_BONUSES:
            return {
                ...state,
                bonuses: action.bonuses
        case UPDATE_INFORMER:
            return {
                ...state,
                informerData: action.informerData
            }
        default:
            return state
    }
}