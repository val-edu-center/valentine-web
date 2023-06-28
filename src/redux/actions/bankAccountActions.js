import * as bankAccountApi from "../../api/bankAccountApi"
import { apiCallError, beginApiCall } from "./apiStatusActions"
import { CREATE_BANK_ACCOUNT_SUCCESS, LOAD_BANK_ACCOUNTS_SUCCESS } from "./actionTypes"

export function loadBankAccountsSuccess (bankAccounts) {
    return {type: LOAD_BANK_ACCOUNTS_SUCCESS, bankAccounts}
}

export function createBankAccountSuccess (username) {
    return {type: CREATE_BANK_ACCOUNT_SUCCESS, bankAccount: {username, balance: 0}}
}

export function loadBankAccounts() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return bankAccountApi
        .getAllAccountsParse()
        .then(results => {
            dispatch(loadBankAccountsSuccess(results));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function createBankAccount(username) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return bankAccountApi
        .createBankAccountParse(username)
        .then(() => {
            dispatch(createBankAccountSuccess(username));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}
