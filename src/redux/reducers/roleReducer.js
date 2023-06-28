import { LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE_SUCCESS, CHANGE_GROUP_ROLE_SUCCESS, CLEAR_ROLES, ADD_USER_ROLE_SUCCESS, REMOVE_USER_ROLE_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.roles, action) {
    switch (action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return { ...state, all: action.allRoles }
        case LOAD_USERS_FOR_ROLE_SUCCESS:
            return { ...state, userToRoles: addUsers(state, action.role.get('name'), action.users) }
        case ADD_USER_ROLE_SUCCESS:
            return { ...state, userToRoles: changeRole(state, action.user, action.role.get('name'), null)}
        case REMOVE_USER_ROLE_SUCCESS:
            return { ...state, userToRoles: changeRole(state, action.user, null, action.role.get('name'))}
        case CHANGE_GROUP_ROLE_SUCCESS:
            return {...state, userToRoles: changeRole(state, action.user, action.newRole.get('name'), action.oldRole.get('name'))}
        case CLEAR_ROLES:
            return initialState.roles
        default:
            return state
    }
}

function changeRole(state, targetUser, newRole, oldRole) {
    const newMap = new Map()
    state.userToRoles.forEach((roles, userId) => {
        if(userId === targetUser.id) {
            if (newRole && oldRole) {
                const newRoles = roles.filter(role => role !== oldRole)
                newRoles.push(newRole)
                newMap.set(userId, newRoles)
            }
            else if (newRole) {
                newMap.set(userId, [...roles, newRole])
            }
            else if (oldRole) {
                const newRoles = roles.filter(role => role !== oldRole)
                newMap.set(userId, newRoles)
            }
        } else {
            newMap.set(userId, roles)
        }
    })
    return newMap

}

function addUsers(state, roleName, users) {
    const newUsers = users.map(user => [user.id, roleName])
    const existingUsers = Array.from(state.userToRoles.entries())
    return buildNewMap(newUsers.concat(existingUsers))

}

function buildNewMap(entries) {
    const newMap = new Map()
    entries.map(entry => {
        const userId = entry[0]
        const roles = entry[1]
        const existingRoles = newMap.get(userId)

        if (Array.isArray(roles)) {
            if (existingRoles) {
                newMap.set(userId, [...existingRoles, ...roles])
            } else {
                newMap.set(userId, roles)
            }
        } else {
            if (existingRoles) {
                newMap.set(userId, [...existingRoles, roles])
            } else {
                newMap.set(userId, [roles])
            }
        }

        return newMap;
    })

    return newMap

}