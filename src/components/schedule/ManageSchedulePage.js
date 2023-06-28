import React from "react"
import * as scheduleActions from "../../redux/actions/scheduleActions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import Parse from 'parse/dist/parse.min.js'
import { useState } from "react"
import ScheduleForm from "./ScheduleForm"
import PropTypes from 'prop-types'
import Schedule from "../../model/Schedule"
import Spinner from "../common/Spinner"

const ManageSchedulePage = ({ actions, schedules, showSpinner, history, ...props }) => {
    const [schedule, setSchedule] = useState({ ...props.schedule })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)

    function changeDate(schedule, newDate) {
        const oldParseObject = schedule.parseObject
        //TODO Address DST
        oldParseObject.set("scheduleDate", new Date(newDate + "T00:00:00.000-06:00"))
        return {
            ...schedule,
            scheduleDate: newDate,
            parseObject: oldParseObject
        }
    }

    function handleDateChange(event) {
        const newDate = event.target.value
        const newSchedule = changeDate(schedule, newDate)
        setSchedule(newSchedule)

    }
    
    function changeFile(schedule, newFile) {
        const oldParseObject = schedule.parseObject
        oldParseObject.set("file", newFile)
        return {
            ...schedule,
            file: newFile,
            parseObject: oldParseObject
        }

    }

    function handleFileChange(event) {
        const newFile = event.target.files[0]
        const newSchedule = changeFile(schedule, newFile)
        setSchedule(newSchedule)
    }

    function formIsValid() {
        const { file, scheduleDate } = schedule
        const errors = {}

        if (!file) errors.file = "Image is required"
        if (!scheduleDate) errors.scheduleDate = "Date is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)
        actions.schedule.saveSchedule(schedule).then(() => {
            toast.success("Schedule saved.")
            history.push("/schedules")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }
    return showSpinner ? <Spinner/> : <ScheduleForm onFileChange={handleFileChange} onDateChange={handleDateChange} onSave={handleSave} schedule={schedule} errors={errors} saving={saving}/>
}

function createNewSchedule() {
    const schedule = new Schedule
    schedule.parseObject = new Parse.Object("Schedule")
    return schedule
}

function mapStateToProps(state, ownProps) {
    // this is available bc /:slug in App.js
    const schedule = createNewSchedule()

    var showSpinner = false
    if (state.apiCallsInProgress > 0) {
        showSpinner = true
    } else if (showSpinner) {
        showSpinner = false
    }

    return {
        schedules: state.schedules,
        schedule,
        showSpinner,
        errors: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            schedule: bindActionCreators(scheduleActions, dispatch)
        }
    }
}

ManageSchedulePage.propTypes = {
    errors: PropTypes.array.isRequired,
    schedules: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    schedule: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedulePage)