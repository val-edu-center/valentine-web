import initialState from "./initialState"
import { CLEAR_BANK_ACCOUNTS, CREATE_BANK_ACCOUNT_SUCCESS, LOAD_BANK_ACCOUNTS_SUCCESS } from "../actions/actionTypes"

export default function bankAccountReducer(state = initialState.bankAccounts, action) {
    switch(action.type) {
        case LOAD_BANK_ACCOUNTS_SUCCESS:
            return action.bankAccounts
        case CREATE_BANK_ACCOUNT_SUCCESS:
            return [...state, {...action.bankAccount}]
        case CLEAR_BANK_ACCOUNTS:
            return initialState.bankAccounts
        default:
            return state
    }
}