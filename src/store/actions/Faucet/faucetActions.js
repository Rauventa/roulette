import {errorModalService} from "../../../services/modal/errorModalService";
import {axiosClient} from "../../../utils/axiosClient";
import {GET_FAUCET_HISTORY} from "../actionTypes";

export function getFaucetHistory(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Statistics/GetLastFaucetPayments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response?.data?.errors?.length) {
                errorModalService(response.data.errors[0], response.data.status)
            } else {
                dispatch(getFaucetHistorySuccess(response.data.payload))
            }

        } catch (e) {
            errorModalService('Faucet history load error', e.response.status)
        }
    }
}

export function getFaucetHistorySuccess(history) {
    return {
        type: GET_FAUCET_HISTORY,
        history
    }
}