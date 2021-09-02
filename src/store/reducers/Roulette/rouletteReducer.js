import {GET_ROULETTE_GAME} from "../../actions/actionTypes";

const initialState = {
    gameData: {}
};

export default function rouletteReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROULETTE_GAME:
            return {
                ...state,
                gameData: action.gameData
            }
        default:
            return state
    }
}