import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"
import { Link } from 'react-router-dom'

const AccountList = ({ onDeleteClick, onIsApprovedChange, onCreateBankAccountChange, onGroupRoleChange, onSubmitClick, session, users, bankAccounts, selectedGroup }) => {
    const bankAccountMap = getBankAccountMap(bankAccounts)
    const isAdmin = session.roles.isStaff || session.roles.isDirector
    const isBanker = session.roles.isBanker
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Created Date</th>
                    <th>Group</th>
                    {isAdmin && <th>Approved</th>}
                    {isBanker && <th>Bank Account</th>}
                    {isAdmin && <th />}
                    {isAdmin && <th />}
                </tr>
            </thead>
            <tbody>
                {users.filter(user => !selectedGroup || roleMapper.getGroupRole(user.roles) === selectedGroup).filter(user => isDeletable(user, session.roles)).map(user => {
                    return (
                        <tr key={user.id}>
                            <td>
                                <Link to={"/account/" + user.id}>{user.username}</Link>
                            </td>
                            <td> {getTime(user.createdAt)} </td>
                            <td>{getGroupRoleInput(user, isAdmin, onGroupRoleChange)}</td>
                            {isAdmin && <td>{getIsApproved(user, onIsApprovedChange)}</td>}
                            {isBanker &&
                                <td>
                                    {getBankAccount(bankAccountMap[user.username], user.id, onCreateBankAccountChange)}
                                </td>
                            }
                            {isAdmin &&
                                <td>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => onSubmitClick(user)}
                                    >
                                        Submit
                                    </button>
                                </td>
                            }
                            {isAdmin &&
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDeleteClick(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
const getGroupRoleInput = (user, isAdmin, onChange) => {
    const groupRole = roleMapper.getGroupRole(user.parseObject.get("roles"))
    if (groupRole) {
        if (isAdmin) {
            return <select name="groups" id={user.id} value={groupRole} onChange={onChange}>
                {
                    roleMapper.roleGroups.map(r => getRoleOption(r))
                }
            </select>
        } else {
            return <select name="groups" id="group-select" value={groupRole} readOnly >
                {
                    roleMapper.roleGroups.map(r => getRoleOption(r))
                }
            </select>

        }
    } else {
        return <p>N/A</p>
    }

}

const getBankAccountMap = bankAccounts => {
    return bankAccounts.reduce(function (map, bankAccount) {
        map[bankAccount.username] = bankAccount
        return map
    }, {})
}
const getBankAccount = (account, id, handleChange) => {
    if (account) {
        return <p>{"$ " + account.balance}</p>
    } else {
        return <input type="checkbox" id={id} name={id} value={id} onChange={handleChange} />
    }
}
const getRoleOption = role => {
    return <option key={role} value={role}>{role}</option>
}
const getIsApproved = (user, handleChange) => {
    const isApproved = user.isApproved
    const id = user.id
    return <input type="checkbox" id={id} name={id} value={id} defaultChecked={isApproved} onChange={handleChange} />
}

function getTime(time) {
    return time.toDateString()
}

function isDeletable(user, sessionRoles) {
    const roles = roleMapper.getRoles(user.roles)
    const isNotDeletable = roles.isDirector || (roles.isStaff && !sessionRoles.isDirector)
    return !isNotDeletable
}

AccountList.propTypes = {
    users: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onIsApprovedChange: PropTypes.func.isRequired,
    onCreateBankAccountChange: PropTypes.func.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
    bankAccounts: PropTypes.array.isRequired,
    onGroupRoleChange: PropTypes.func.isRequired
}

export default AccountList