import {FAQ_QUESTIONS, LOADER_VISIBILITY} from "../../actions/actionTypes";

const initialState = {
    loader: false,
    faqQuestions: []
};

export default function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_VISIBILITY:
            return {
                ...state,
                loader: action.loader
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