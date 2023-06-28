import User from '../model/User'
import * as roleMapper from './RoleMapper'

export function mapUserParse(parseUser) {
    const user = new User
    const roles = parseUser.get("roles")
    user.createdAt = parseUser.createdAt
    user.id = parseUser.id
    user.username = parseUser.getUsername()
    user.roles = roles
    user.isApproved = parseUser.get("isApproved")
    user.first = parseUser.get("firstName") || ""
    user.last = parseUser.get("lastName") || ""
    user.parseObject = parseUser
    user.groupRole = roleMapper.getGroupRole(roles)
    return user
}