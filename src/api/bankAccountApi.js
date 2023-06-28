import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils";
import * as bankAccountMapper from '../utility/BankAccountMapper'
import Parse from 'parse/dist/parse.min.js'
import BankAccount from '../model/BankAccount'

const baseUrl = process.env.BACK4APP_API_URL + "/classes/Accounts";
const appId = process.env.BACK4APP_APP_ID;
const restApiKey = process.env.BACK4APP_REST_API_KEY;

export function getAllAccounts() {
    const state = loadFromLocalStorage()
    const sessionToken = state.session.sessionToken
    return fetch(baseUrl, {
        headers: {
            "content-type": "application/json",
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": restApiKey,
            "X-Parse-Session-Token": sessionToken
        }
    })
        .then(handleResponse)
        .catch(handleError);
}


export const getAllAccountsParse = async () => {
    const query = new Parse.Query('Accounts')
    const results = await query.find()
    return results.map(bankAccount => bankAccountMapper.mapBankAccountParse(bankAccount)) 
}

export function createBankAccount(username) {
    const state = loadFromLocalStorage()
    const sessionToken = state.session.sessionToken
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": restApiKey,
            "X-Parse-Session-Token": sessionToken
        },
        body: JSON.stringify({username, balance: 0})
    })
        .then(handleResponse)
        .catch(handleError);
}

export const createBankAccountParse = async (username) => {
    const bankAccount = new Parse.Object("Accounts")

    bankAccount.set("username", username)
    bankAccount.set("balance", 0)

    await bankAccount.save()
    return bankAccountMapper.mapBankAccountParse(bankAccount)
}