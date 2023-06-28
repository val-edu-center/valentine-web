import { CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS, LOAD_USERS_SUCCESS, DELETE_USER_OPTIMISTIC, CLEAR_USERS, SELECT_GROUP } from "../actions/actionTypes"
import initialState from './initialState'

export default function userReducer(state = initialState.users, action) {
    switch(action.type) {
        case CREATE_USER_SUCCESS:
            return {
                selectedGroup: action.user.groupRole,
                list: [action.user, ...state.list]
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                list: state.list.map (
                    user => user.id === action.user.id ? action.user : user 
                )
            }
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                list: action.users
            }
        case DELETE_USER_OPTIMISTIC:
            return {
                ...state,
                list: state.list.filter (user => user.id !== action.user.id)
            }
        case CLEAR_USERS:
            return {
                ...state,
                list: initialState.users.list
            }
        case SELECT_GROUP:
            return {
                ...state,
                selectedGroup: action.group
            }

        default:
            return state
    }

}