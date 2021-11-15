import {FAQ_QUESTIONS, GET_USER_COUNTRY, LOADER_VISIBILITY, UPDATE_INFORMER, GET_AVIABLE_BONUSES} from "../actionTypes";
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

export function getUserCountry() {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Auth/GetUserCountry')

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getUserCountrySuccess(response.data))
            }
        } catch (e) {
            errorModalService('Cannot load user country', e.response?.status || null)
        }
    }
}

export function getAvialableBonuses() {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Auth/GetAvailableBonuses')

            if (response.data?.errors?.length) {
                errorModalService(response.data?.errors[0], response.data.status)
            } else {
                dispatch(getAvialableBonusesSuccess(response.data))
            }
        } catch (e) {
            errorModalService('No aviable bonuses', e.response?.status || null)
        }
    }
}

export const updateInformer = informerData => {
    return {
        type: UPDATE_INFORMER,
        informerData
    }
}

export const loadFaqQuestionsSuccess = faqQuestions => {
    return {
        type: FAQ_QUESTIONS,
        faqQuestions
    }
}

export const getUserCountrySuccess = country => {
    return {
        type: GET_USER_COUNTRY,
        country
    }
};

export const getAvialableBonusesSuccess = (bonuses) => {
    return{
        type: GET_AVIABLE_BONUSES,
        bonuses
    }
};