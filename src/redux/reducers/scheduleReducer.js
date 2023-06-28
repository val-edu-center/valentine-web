
import { CREATE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_OPTIMISTIC, LOAD_ALL_SCHEDULES_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function scheduleReducer(state = initialState.schedules, action) {
    switch (action.type) {
        case CREATE_SCHEDULE_SUCCESS:
            return [action.schedule, ...state]
        case LOAD_ALL_SCHEDULES_SUCCESS:
            return action.schedules
        case DELETE_SCHEDULE_OPTIMISTIC:
            return state.filter( schedule => schedule.id !== action.schedule.id )
        default:
            return state
    }
}