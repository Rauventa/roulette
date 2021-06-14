import {combineReducers} from "redux";
import balanceReducer from "./Balance/balanceReducer";
import diceReducer from "./Dice/diceReducer";

export default combineReducers({
    balanceReducer: balanceReducer,
    diceReducer: diceReducer
})