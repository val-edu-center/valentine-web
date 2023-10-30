import Parse from 'parse/dist/parse.min.js'
import * as userMapper from '../utility/UserMapper'

export const getUsersParse = async () => {
  const User = new Parse.User()
  const query = new Parse.Query(User)
  query.limit(200)
  query.descending('createdAt')
  
  const results = await query.find()
  return results.map(user => userMapper.mapUserParse(user))
}

export const saveUserParse = async (user) => {
  await user.parseObject.save()
  const newUser = userMapper.mapUserParse(user.parseObject)
  newUser.createBankAccount = user.createBankAccount
  return newUser
}


export const deleteUserParse = async (user) => {
  await user.parseObject.destroy()
}