import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Parse from 'parse/dist/parse.min.js'
import * as userActions from "../../redux/actions/userActions"
import * as roleActions from "../../redux/actions/roleActions"
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AccountForm from "./AccountForm"
import { toast } from "react-toastify"
import * as roleMapper from "../../utility/RoleMapper"
import User from "../../model/User"

const ManageAccountPage = ({ accounts, actions, history, allRoles, ...props }) => {
    const [account, setAccount] = useState({ ...props.account })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)
    useEffect(() => {
        if (accounts.length === 0) {
            actions.users.loadUsers().catch(error => {
                alert("Loading users failed " + error)
            })
        }
        if (allRoles.length === 0) {
            actions.roles.loadAllRoles()
                .then(roles => roles.map(r => actions.roles.loadUsersForRole(r)))
                .catch(error => {
                    alert("Loading roles failed " + error)
                })
        }

        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [props.account])

    function changeRoles(account, role, checked) {
        const oldParseObject = account.parseObject
        if (role === 'select-all') {
            const newRoles = checked ? allRoles.map(r => r.getName()).filter(r => !roleMapper.roleGroups.includes(r)) : []
            return {
                ...account,
                roles: account.groupRole ? [...newRoles, account.groupRole] : newRoles,
                parseObject: oldParseObject
            }

        } else {
            const newRoles = checked ? [...account.roles, role] : account.roles.filter(r => r !== role)
            return {
                ...account,
                roles: account.groupRole ? [...newRoles, account.groupRole] : newRoles,
                parseObject: oldParseObject
            }
        }
    }

    function handleRolesChange(event) {
        const role = event.target.name
        const newAccount = changeRoles(account, role, event.target.checked)
        setAccount(newAccount)

    }

    function changeUsername(account, username) {
        const parseObject = account.parseObject
        parseObject.set("username", username)
        return { ...account, username, parseObject }
    }

    function handleUsernameChange(event) {
        const newUsername = event.target.value
        const newAccount = changeUsername(account, newUsername)
        setAccount(newAccount)

    }

    function changePassword(account, password) {
        const parseObject = account.parseObject
        parseObject.set("password", password)
        return { ...account, password, parseObject }
    }

    function handlePasswordChange(event) {
        const newPassword = event.target.value
        const newAccount = changePassword(account, newPassword)
        setAccount(newAccount)

    }

    function filterOldGroupRole(account) {
        return account.roles.filter(role => role !== account.groupRole)
    }

    function setUsername(first, groupRole, last) {
        return first.toLowerCase() + '.' + last.toLowerCase() + '.' + groupRole.toLowerCase()
    }

    function setPassword(first, groupRole, last) {
        return first.toLowerCase() + '!@!' + groupRole.toLowerCase() + '#$#' + last.toLowerCase()
    }

    function changeGroupRole(account, groupRole) {
        const parseObject = account.parseObject
        const rolesObject = roleMapper.getRoles(account.roles)
        if (rolesObject.isPrep || rolesObject.isCadet) {
            const username = setUsername(account.first, groupRole, account.last)
            const password = setPassword(account.first, groupRole, account.last)
            parseObject.set("username", username)
            parseObject.set("password", password)
        }
        const roles = [...filterOldGroupRole(account), groupRole]
        return { ...account, roles, groupRole }
    }

    function handleRoleChange(event) {
        const newRole = event.target.name
        const newAccount = changeGroupRole(account, newRole)
        setAccount(newAccount)
    }

    function changeLast(account, last) {
        const parseObject = account.parseObject
        const roles = roleMapper.getRoles(account.roles)
        parseObject.set("lastName", last)
        if (roles.isPrep || roles.isCadet) {
            const username = setUsername(account.first, account.groupRole, last)
            const password = setPassword(account.first, account.groupRole, last)
            parseObject.set("username", username)
            parseObject.set("password", password)
        }
        return { ...account, last, parseObject }
    }

    function handleLastChange(event) {
        const newLast = event.target.value
        const newAccount = changeLast(account, newLast)
        setAccount(newAccount)
    }

    function changeFirst(account, first) {
        const parseObject = account.parseObject
        const roles = roleMapper.getRoles(account.roles)
        parseObject.set("firstName", first)
        if (roles.isPrep || roles.isCadet) {
            const username = setUsername(first, account.groupRole, account.last)
            const password = setPassword(first, account.groupRole, account.last)
            parseObject.set("username", username)
            parseObject.set("password", password)
        }
        return { ...account, first, parseObject }
    }

    function handleFirstChange(event) {
        const newFirst = event.target.value
        const newAccount = changeFirst(account, newFirst)
        setAccount(newAccount)

    }

    function formIsValid() {
        const { username, groupRole, password, first, last } = account
        const roles = roleMapper.getRoles(account.roles)
        const enableUserAndPass = !roles.isPrep && !roles.isCadet
        const errors = {}

        if (!groupRole) errors.role = "Role is required"
        if (!username && enableUserAndPass) errors.username = "Username is required"
        if (!password && enableUserAndPass && !account.id) errors.password = "Password is required"
        if (!first) errors.first = "First Name is required"
        if (!last) errors.last = "Last Name is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)

        const oldRoles = account.parseObject.get("roles") ? account.parseObject.get("roles") : []
        const newRoles = account.roles
        const rolesToAdd = allRoles.filter(r => newRoles.includes(r.getName())).filter(r => !oldRoles.includes(r.getName()))
        const rolesToRemove = allRoles.filter(r => oldRoles.includes(r.getName())).filter(r => !newRoles.includes(r.getName()))
        const newGroupRole = roleMapper.getGroupRole(account.parseObject.get("roles")) === account.groupRole ? null : account.groupRole
        account.parseObject.set("roles", account.roles)
        account.parseObject.set('isApproved', true)

        actions.users.saveUser(account).then((updatedAccount) => {
            //TODO Review this logic, account for any error, make sure to clear user if this happens
            actions.roles.changeRoles(updatedAccount, newGroupRole, rolesToAdd, rolesToRemove)
            toast.success("Account saved.")
            history.push("/accounts")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }
    return <AccountForm allRoles={allRoles.map(r => r.getName())} onRolesChange={handleRolesChange} account={account} onFirstChange={handleFirstChange} onLastChange={handleLastChange} onPasswordChange={handlePasswordChange} onRoleChange={handleRoleChange} onUsernameChange={handleUsernameChange} onSave={handleSave} errors={errors} saving={saving}></AccountForm>
}

ManageAccountPage.propTypes = {
    account: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    accounts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    allRoles: PropTypes.array.isRequired,
    usersToRoles: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug
    const account = slug && state.users.list.length > 0 ? getUserById(state.users.list, slug) : createNewUser()
    return {
        allRoles: state.roles.all,
        usersToRoles: state.roles.userToRoles,
        accounts: state.users.list,
        account,
        errors: []
    }
}

function getUserById(users, id) {
    return users.find(user => user.id === id) || null
}

function createNewUser() {
    const user = new User
    user.parseObject = new Parse.User()
    return user
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            users: bindActionCreators(userActions, dispatch),
            roles: bindActionCreators(roleActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountPage)