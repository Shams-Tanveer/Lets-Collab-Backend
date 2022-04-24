import { combineReducers } from "redux";
import listsReducer from "./ListReducers";

const reducer = combineReducers({
        list: listsReducer

});

export default reducer;