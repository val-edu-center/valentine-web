import React from 'react'
import PropTypes from "prop-types"
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import * as roleMapper from "../../utility/RoleMapper"
import CheckboxInput from '../common/CheckboxInput';

const AccountForm = ({ account, allRoles, onFirstChange, onLastChange, onSave, onRoleChange, onUsernameChange, onRolesChange, onPasswordChange, saving = false, errors = {} }) => {
    const roles = roleMapper.getRoles(account.roles)
    const enableUserAndPass = !roles.isPrep && !roles.isCadet
    return (
        <form onSubmit={onSave}>
            <h2>{account.id ? "Edit" : "Add"} Account</h2>
            <RadioInput
                name="role"
                label="Role"
                value={account.groupRole}
                options={roleMapper.roleGroups.filter(r => allRoles.includes(r))}
                onChange={onRoleChange}
                error={errors.role}
            />
            <CheckboxInput
                name="roles"
                label="Other Roles"
                options={allRoles.filter(r => !roleMapper.roleGroups.includes(r))}
                values={account.roles}
                onChange={onRolesChange}
                error={errors.roles}
            />
            <TextInput
                name="first"
                label="First Name"
                value={account.first}
                onChange={onFirstChange}
                error={errors.first}
            />
            <TextInput
                name="last"
                label="Last Name"
                value={account.last}
                onChange={onLastChange}
                error={errors.last}
            />
            {enableUserAndPass && <TextInput
                name="username"
                label="Username"
                value={account.username}
                onChange={onUsernameChange}
                error={errors.username}
            />}
            {enableUserAndPass && !account.id && <TextInput
                name="password"
                label="Password"
                value={account.password}
                onChange={onPasswordChange}
                error={errors.password}
                secureTextEntry={true}
            />}
            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
}

AccountForm.propTypes = {
    account: PropTypes.object.isRequired,
    allRoles: PropTypes.array.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onRolesChange: PropTypes.func.isRequired,
    onFirstChange: PropTypes.func.isRequired,
    onLastChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default AccountForm