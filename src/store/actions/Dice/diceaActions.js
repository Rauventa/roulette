import {axiosClient} from "../../../utils/axiosClient";
import {GET_DICE_HASH} from "../actionTypes";

export function getDiceHash(token) {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/Dice/GetDiceHash', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            dispatch(getDiceHashSuccess(response.data.payload))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getDiceHashSuccess(hash) {
    return {
        type: GET_DICE_HASH,
        hash
    }
}