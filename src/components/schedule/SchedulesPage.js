import React, { useEffect, useState } from "react";
import Parse from 'parse/dist/parse.min.js'
import { bindActionCreators } from 'redux'
import * as scheduleActions from "../../redux/actions/scheduleActions"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ScheduleList from "./ScheduleList";
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom";
import Spinner from "../common/Spinner";


const SchedulePage = ({ schedules, actions, loading }) => {

    const [redirectToAddSchedulePage, setRedirectToAddSchedulePage] = useState(false);
    useEffect(() => {
        if (schedules.length === 0) {
            actions.schedule.loadAllSchedules().catch(error => {
                alert("Loading schedules failed " + error)
            })
        }
        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [])

    const handleDelete = schedule => {
        toast.success("Schedule deleted")
        actions.schedule.deleteSchedule(schedule).catch(
            error => toast.error('Delete failed. ' + error.message, { autoClose: false })
        )
    }

    return loading ? <Spinner /> : (<div>
        {redirectToAddSchedulePage && <Navigate to="/schedule/" />}
        <h2>Manage Schedules</h2>
        <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={() => setRedirectToAddSchedulePage(true)}>
            Add Schedule
        </button>
        <ScheduleList onDeleteClick={handleDelete} schedules={schedules} />
    </div>);

}
SchedulePage.propTypes = {
    actions: PropTypes.object.isRequired,
    schedules: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        schedules: state.schedules,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            schedule: bindActionCreators(scheduleActions, dispatch),
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
