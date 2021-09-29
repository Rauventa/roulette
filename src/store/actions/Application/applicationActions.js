import {FAQ_QUESTIONS, LOADER_VISIBILITY} from "../actionTypes";
import {axiosClient} from "../../../utils/axiosClient";
import {errorModalService} from "../../../services/modal/errorModalService";

export const loaderVisibilityHandler = (state) => {
    return {
        type: LOADER_VISIBILITY,
        loader: state
    }
}

export function loadFaqQuestions(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Faq/GetQuestions', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response)

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(loadFaqQuestionsSuccess(response.data.payload))
            }
        } catch (e) {
            errorModalService('Cannot load questions', e.response?.status || null)
        }
    }
}

export const loadFaqQuestionsSuccess = (faqQuestions) => {
    return {
        type: FAQ_QUESTIONS,
        faqQuestions
    }
}