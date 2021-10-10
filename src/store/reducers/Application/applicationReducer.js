import {FAQ_QUESTIONS, GET_USER_COUNTRY, LOADER_VISIBILITY} from "../../actions/actionTypes";

const initialState = {
    loader: false,
    country: 'US',
    faqQuestions: []
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
        default:
            return state
    }
}