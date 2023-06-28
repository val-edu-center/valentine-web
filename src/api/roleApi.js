import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils"
import Parse from 'parse/dist/parse.min.js'
import { CLUB_ROLE, DIRECTOR_ROLE, STAFF_ROLE } from '../utility/RoleMapper'

const baseUrl = process.env.BACK4APP_API_URL + "/roles/"
const appId = process.env.BACK4APP_APP_ID
const restApiKey = process.env.BACK4APP_REST_API_KEY

export function getAllRoles() {
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
        .catch(handleError)
}

export const getAllParseRoles = async () => {
    const query = new Parse.Query(Parse.Role)
    const results = await query.find()
    return results
    
}

export const getUsersForRole = async (role) => {
    const query = role.getUsers().query()
    const results = await query.find()
    return results
}

export const removeUser = async (role, user) => {
    var userQuery = new Parse.User()
    userQuery.id = user.id
    role.getUsers().remove(userQuery)
    await role.save()
}
export const addUser = async (role, user) => {
    var userQuery = new Parse.User()
    userQuery.id = user.id
    role.getUsers().add(userQuery)
    await role.save()
}
export const changeGroupRole = async (roleName, user) => {
    //TODO to add retain multiple roles
    const userACL = new Parse.ACL()

    userACL.setReadAccess(user.id, true)
    userACL.setRoleReadAccess(roleName, true)
    userACL.setRoleReadAccess(STAFF_ROLE, true)
    userACL.setRoleReadAccess(DIRECTOR_ROLE, true)
    userACL.setRoleReadAccess(CLUB_ROLE, true)

    userACL.setWriteAccess(user.id, true)
    userACL.setRoleWriteAccess(DIRECTOR_ROLE, true)
    userACL.setRoleWriteAccess(STAFF_ROLE, true)

    await user.parseObject.setACL(userACL).save(null, { useMasterKey: true });
}