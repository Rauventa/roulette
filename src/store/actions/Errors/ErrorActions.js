import {UPDATE_ERROR_MESSAGE} from "../actionTypes";
import {openErrorModalHandler} from "../Modal/modalActions";

export function updateErrorHandler(errorMessage, status) {
    return dispatch => {
        dispatch(updateErrorHandlerSuccess(errorMessage, status))
        dispatch(openErrorModalHandler())
    }
}

export function updateErrorHandlerSuccess(errorMessage, status) {
    return {
        type: UPDATE_ERROR_MESSAGE,
        errorMessage, status
    }
}