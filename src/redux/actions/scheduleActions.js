import * as scheduleApi from "../../api/scheduleApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { LOAD_ALL_SCHEDULES_SUCCESS, CREATE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_OPTIMISTIC } from "./actionTypes"

export function loadAllSchedulesSuccess(schedules) {
    return { type: LOAD_ALL_SCHEDULES_SUCCESS, schedules }
}

export function createScheduleSuccess(schedule) {
    return { type: CREATE_SCHEDULE_SUCCESS, schedule }
}

export function deleteScheduleOptimistic(schedule) {
    return { type: DELETE_SCHEDULE_OPTIMISTIC, schedule }
}

export function loadAllSchedules() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return scheduleApi
            .getAllSchedules()
            .then(schedules => {
                dispatch(loadAllSchedulesSuccess(schedules))
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}

export function saveSchedule(schedule) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return scheduleApi
            .saveSchedule(schedule)
            .then(savedSchedule => {
                dispatch(createScheduleSuccess(savedSchedule))
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}

export function deleteSchedule(schedule) {
    return function (dispatch) {
        dispatch(deleteScheduleOptimistic(schedule))
        return scheduleApi.deleteSchedule(schedule)
    }
}