import { CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS, LOAD_USERS_SUCCESS, DELETE_USER_OPTIMISTIC, SELECT_GROUP } from "./actionTypes";
import * as userApi from "../../api/userApi"
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function createUserSuccess(user) {
    return { type: CREATE_USER_SUCCESS, user}
}

export function updateUserSuccess(user) {
    return { type: UPDATE_USER_SUCCESS, user}
}

export function loadUsersSuccess(users) {
    return { type: LOAD_USERS_SUCCESS, users}
}

export function deleteUserOptimistic(user) {
    return { type: DELETE_USER_OPTIMISTIC, user}
}

export function selectGroupSuccess(group) {
    return { type: SELECT_GROUP, group}
}

export function loadUsers() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return userApi
        .getUsersParse()
        .then(users => {
            dispatch(loadUsersSuccess(users));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function selectGroup(group) {
    return function (dispatch) {
        dispatch(selectGroupSuccess(group))
    } 
 }

export function saveUser(user) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return userApi
        .saveUserParse(user)
        .then(updatedUser => { 
            if (user.id) {
                dispatch(updateUserSuccess(updatedUser))
            } else {
                dispatch(createUserSuccess(updatedUser))
            }
            return updatedUser
        }).catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function updateUser(user) {
    return function (dispatch) {
        return dispatch(updateUserSuccess(user))
    }
}

export function deleteUser(user) {
    return function (dispatch) {
        dispatch(deleteUserOptimistic(user))
        return userApi.deleteUserParse(user)
    }
}