import { ActionTypes } from "."

export const setTask= (todos,inprogress,toreview,done)=>{
    return {
        type: ActionTypes.SET_TASKLIST,
        payload_todo: todos,
        payload_inprogress: inprogress,
        payload_toreview: toreview,
        payload_done : done
    }
}

export const moveselectTask= (task)=>{
    return {
        type: ActionTypes.MOVE_SELECTED_TASK,
        payload: task
    }
}

export const removeTask= (tasks)=>{
    return {
        type: ActionTypes.REMOVE_TASK,
        payload: tasks
    }
}

export const addTask = (task)=>{
    return{
        type: ActionTypes.Add_TASK,
        payload: task
    }
}