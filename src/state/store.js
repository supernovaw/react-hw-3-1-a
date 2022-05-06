import { createStore, combineReducers } from "redux";
import repairNotesReducer from "./reducers/repairNotesReducer";

const combined = combineReducers({
    repairNotes: repairNotesReducer
});

export default createStore(combined, {});