import {combineReducers} from "redux";
import balanceReducer from "./Balance/balanceReducer";
import diceReducer from "./Dice/diceReducer";
import errorReducer from "./Errors/ErrorReducer";
import modalReducer from "./Modal/modalReducer";
import hiloReducer from "./Hilo/hiloReducer";
import statsReducer from "./Stats/statsReducer";
import profileReducer from "./Profile/profileReducer";

export default combineReducers({
    balanceReducer: balanceReducer,
    diceReducer: diceReducer,
    errorReducer: errorReducer,
    modalReducer: modalReducer,
    hiloReducer: hiloReducer,
    statsReducer: statsReducer,
    profileReducer: profileReducer
})