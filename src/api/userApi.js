import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils"
import Parse from 'parse/dist/parse.min.js'
import * as userMapper from '../utility/UserMapper'
const baseUrl = process.env.BACK4APP_API_URL + "/users/"
const appId = process.env.BACK4APP_APP_ID
const restApiKey = process.env.BACK4APP_REST_API_KEY

export function getUsers() {
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

export const getUsersParse = async () => {
  const User = new Parse.User()
  const query = new Parse.Query(User)

  query.descending('createdAt');
  
  const results = await query.find()
  return results.map(user => userMapper.mapUserParse(user))
}

export const saveUserParse = async (user) => {
  await user.parseObject.save()
  const newUser = userMapper.mapUserParse(user.parseObject)
  newUser.createBankAccount = user.createBankAccount
  return newUser
}

//TODO convert to parse api
export function deleteUser(userId) {
  const state = loadFromLocalStorage()
  const sessionToken = state.session.sessionToken
  return fetch(baseUrl + userId, {
    method: "DELETE",
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

export const deleteUserParse = async (user) => {
  await user.parseObject.destroy()
}