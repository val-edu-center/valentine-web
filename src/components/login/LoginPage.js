import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import * as sessionActions from "../../redux/actions/sessionActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { newCredentials } from '../../model/mockData'
import Spinner from "../common/Spinner";
import { toast } from "react-toastify"
import LoginForm from "./LoginForm";

const LoginPage = ({ session, actions, history, ...props }) => {
    //This is how React Hooks add state to function components
    const [credentials, setCredentials] = useState({...props.credentials})
    const [errors, setErrors] = useState({...props.errors})
    const [saving, setSaving] = useState(false)
    useEffect( () => {
        if (!session.sessionToken) {
            setCredentials({username:'',password:''})
        } else {
            history.push("/")
        }
    //useEffect with an empty array is equivalent to componentDidMount
    //Otherwise, would run everytime it renders
    }, [props.session])


    //name identifies the field that's changed
    function handleChange(event) {
        const { name, value } = event.target 
        setCredentials ( prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }))
    }

    function formIsValid() {
        const { username, password } = credentials
        const errors = {}

        if (!username) errors.username = "Username is required"
        if (!password) errors.password = "Password is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleLogin(event) {
        event.preventDefault()
        if (!formIsValid()) return 
        setSaving(true)
        actions.session.loadSessionParse(credentials).then( () => {
            toast.success("Successful Login")
            history.push("/")
        }).catch (error => {
            setSaving(false)
            setErrors( {onSave: error.message} )
        })
    }

    return saving ? (<Spinner/>):(<LoginForm credentials={credentials} errors={errors}  onChange={handleChange} onLogin={handleLogin} saving={saving}></LoginForm>)
    
}

LoginPage
.propTypes = {
    errors: PropTypes.array.isRequired,
    credentials: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        session: state.session,
        credentials: newCredentials,
        errors: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            session: bindActionCreators(sessionActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage
    );