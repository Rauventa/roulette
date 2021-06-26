import {CLOSE_MODAL_HANDLER, OPEN_ERROR_MODAL_HANDLER, OPEN_MODAL_HANDLER} from "../../actions/actionTypes";

const initialState = {
    modal: false,
    errorModal: false,
    type: ''
};

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_HANDLER:
            return {
                ...state,
                modal: action.modal,
                errorModal: action.errorModal
            }
        case OPEN_ERROR_MODAL_HANDLER:
            return {
                ...state,
                modal: action.modal,
                errorModal: action.errorModal
            }
        case CLOSE_MODAL_HANDLER:
            return {
                ...state,
                modal: action.modal,
                errorModal: action.errorModal
            }
        default:
            return state
    }
}