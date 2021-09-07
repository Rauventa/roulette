import {LOADER_VISIBILITY} from "../actionTypes";

export const loaderVisibilityHandler = (state) => {
    return {
        type: LOADER_VISIBILITY,
        loader: state
    }
}