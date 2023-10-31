import * as roleApi from "../../api/roleApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { ADD_USER_ROLE_SUCCESS, CHANGE_GROUP_ROLE_SUCCESS, LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE_SUCCESS, REMOVE_USER_ROLE_SUCCESS } from "./actionTypes"

export function loadAllRolesSuccess(allRoles) {
    return { type: LOAD_ALL_ROLES_SUCCESS, allRoles }
}

export function loadUsersForRoleSuccess(role, users) {
    return { type: LOAD_USERS_FOR_ROLE_SUCCESS, role, users }
}

export function changeGroupRoleSuccess(user, newRole, oldRole) {
    return { type: CHANGE_GROUP_ROLE_SUCCESS, oldRole, newRole, user }
}

export function addUserSuccess(user, role) {
    return { type: ADD_USER_ROLE_SUCCESS, user, role}
}

export function removeUserSuccess(user, role) {
    return { type: REMOVE_USER_ROLE_SUCCESS, user, role}
}

export function loadAllRoles() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return roleApi
            .getAllParseRoles()
            .then(roles => {
                dispatch(loadAllRolesSuccess(roles))
                return roles
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}
export function loadUsersForRole(role) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return roleApi
            .getUsersForRole(role)
            .then(users => {
                dispatch(loadUsersForRoleSuccess(role, users));
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}
//TODO organize this
export function changeGroupRole(user, newRole, oldRole) {
    return function (dispatch) {
        return roleApi
            .changeGroupRole(newRole, user)
            .then(() => {
                roleApi
                    .addUser(newRole, user)
                    .then(() => {
                        if (oldRole !== null) {
                            roleApi.removeUser(oldRole, user)
                                .then(() => {
                                    dispatch(changeGroupRoleSuccess(user, newRole, oldRole))
                                })
                                .catch(error => {
                                    dispatch(apiCallError())
                                    throw error
                                })
                        }
                    })
                    .catch(error => {
                        dispatch(apiCallError())
                        throw error
                    })

            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}

export function changeRoles(user, newGroupRole, rolesToAdd, rolesToRemove) {
    return function (dispatch) {
        rolesToAdd.map(roleToAdd => roleApi.addUser(roleToAdd, user)
        .then(() => {
            dispatch(addUserSuccess(user, roleToAdd))
        })
        .catch(error => {
            dispatch(apiCallError())
            throw error
        }))
        rolesToRemove.map(roleToRemove => roleApi.removeUser(roleToRemove, user)
        .then(() => {
            dispatch(removeUserSuccess(user, roleToRemove))
        })
        .catch(error => {
            dispatch(apiCallError())
            throw error
        }))
        if (newGroupRole) {
            roleApi.changeGroupRole(newGroupRole, user)
        }
        return
    }
}