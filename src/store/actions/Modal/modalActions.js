import {CLOSE_MODAL_HANDLER, OPEN_ERROR_MODAL_HANDLER, OPEN_MODAL_HANDLER} from "../actionTypes";

export function openModalHandler() {
    return {
        type: OPEN_MODAL_HANDLER,
        modal: true,
        errorModal: false
    }
}

export function openErrorModalHandler() {
    return {
        type: OPEN_ERROR_MODAL_HANDLER,
        modal: false,
        errorModal: true
    }
}

export function closeModalHandler() {
    return {
        type: CLOSE_MODAL_HANDLER,
        modal: false,
        errorModal: false
    }
}
