import { ActionTypes } from "../Actions";


let initialState = {
    toDoTask: [],
    inProgressTask:[],
    toReviewTask: [],
    doneTask: []
}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_TASKLIST:
            return {...state,toDoTask:action.payload_todo,inProgressTask: action.payload_inprogress,toReviewTask:action.payload_toreview,doneTask:action.payload_done};
        case ActionTypes.Add_TASK:
            return {...state,toDoTask:[...state.toDoTask,action.payload]};
        default:
            return state;
    }
};
export default listsReducer;