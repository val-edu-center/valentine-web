import React from "react"
import PrintForm from "./PrintForm"
import * as printActions from "../../redux/actions/printActions"
import { bindActionCreators } from "redux"
import Print from "../../model/Print"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import Parse from 'parse/dist/parse.min.js'
import { setState, useState } from "react"

const ManagePrintPage = ({ actions, prints, showSpinner, history, ...props }) => {
    const [print, setPrint] = useState({ ...props.print })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)

    function changeDescription(print, description) {
        const parseObject = print.parseObject
        parseObject.set("description", description)
        return {
            ...print,
            description,
            parseObject
        }
    }

    function handleDescriptionChange(event) {
        const description = event.target.value
        const newPrint = changeDescription(print, description)
        setPrint(newPrint)
    }

    function changeColor(print, color) {
        const parseObject = print.parseObject
        parseObject.set("color", color)
        return {
            ...print,
            color: color ? color : '',
            parseObject
        }
    }

    function handleColorChange(event) {
        const color = event.target.value
        const newPrint = changeColor(print, color)
        setPrint(newPrint)
    }

    function formIsValid() {
        const { description, color } = print
        const errors = {}

        if (!description) errors.description = "Description is required"
        if (!color) errors.color = "Color is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)
        actions.print.savePrint(print).then(() => {
            toast.success("Print saved.")
            history.push("/prints")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }
    //TODO make available from persistence
    const availableColors = ["Black","White","Blue","Pink","Gold","Grey","Brown","Teal","Clear"]
    return <PrintForm onSave={handleSave} onColorChange={handleColorChange} onDescriptionChange={handleDescriptionChange} print={print} errors={errors} saving={saving} colors={availableColors.map(color => {return {value:color, text:color}})}></PrintForm>
}

function mapStateToProps(state, ownProps) {
    // this is available bc /:slug in App.js
    const slug = ownProps.match.params.slug
    const print = slug && state.prints.length > 0 ? getPrintById(state.prints, slug) : createNewPrint()

    var showSpinner = false
    if (state.apiCallsInProgress > 0) {
        showSpinner = true
    } else if (showSpinner) {
        showSpinner = false
    }

    return {
        prints: state.prints,
        print,
        showSpinner,
        errors: []
    }
}
function getPrintById(prints, id) {
    return prints.find(print => print.id === id) || null
}

function createNewPrint() {
    const print = new Print
    const currentUsername = Parse.User.current().getUsername()
    print.clientUsername = currentUsername
    print.parseObject = new Parse.Object("Print")
    print.parseObject.set("clientUsername", currentUsername)
    
    return print
}
//TODO Add prop types
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            print: bindActionCreators(printActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePrintPage)