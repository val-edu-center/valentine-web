import { handleResponse, handleError } from "./apiUtils"
import Parse from 'parse/dist/parse.min.js'

const baseUrl = process.env.BACK4APP_API_URL + "/login"
const appId = process.env.BACK4APP_APP_ID;
const restApiKey = process.env.BACK4APP_REST_API_KEY;

export function login(username, password) {
  return fetch(baseUrl + '?username=' + username + '&password=' + password, {
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export const loginParse = async (username, password) => {
  let user = await Parse.User.logIn(username,password)
  return user
}
