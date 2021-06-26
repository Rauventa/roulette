import {UPDATE_ERROR_MESSAGE} from "../actionTypes";
import {openErrorModalHandler} from "../Modal/modalActions";

export function updateErrorHandler(errorMessage) {
    return dispatch => {
        dispatch(updateErrorHandlerSuccess(errorMessage))
        dispatch(openErrorModalHandler())
    }
}

export function updateErrorHandlerSuccess(errorMessage) {
    return {
        type: UPDATE_ERROR_MESSAGE,
        errorMessage
    }
}