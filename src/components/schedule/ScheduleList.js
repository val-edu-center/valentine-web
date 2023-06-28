import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

const ScheduleList = ({ onDeleteClick, schedules }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Schedule Date</th>
                    <th>File Link</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {schedules.map(schedule => {
                    const url = schedule.file.url()
                    const name_parts = schedule.file.name().split('_')
                    const name = name_parts[name_parts.length - 1]
                    return (
                        <tr key={schedule.id}>
                            <td>
                                {schedule.scheduleDate.toDateString()}
                            </td>
                            <td> <a href={url}>{name}</a> </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteClick(schedule)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


ScheduleList.propTypes = {
    onDeleteClick: PropTypes.func.isRequired,
    schedules: PropTypes.array.isRequired,
}

export default ScheduleList;