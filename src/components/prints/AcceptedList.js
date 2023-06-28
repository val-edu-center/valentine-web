import React from "react"

const AcceptedList = ({acceptedPrints, onUpdateClick, onStatusChange, statusOptions}) => {
    return (
        <table id='accepted-table' className="table">
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Date Approved</th>
                    <th>Color</th>
                    <th>Printer</th>
                    <th>Desginer</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {acceptedPrints.map(print => {
                    const styleColor = print.color === "White" ? "Black" : print.color
                    return <tr key={print.id}>
                        <td>{print.clientUsername}</td>
                        <td>{print.approvedAt.toDateString()}</td>
                        <td style={{color:styleColor}}>{print.color}</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{print.description}</td>
                        <td>{getStatusSelect(print.id, print.parseObject.get("status"), statusOptions, onStatusChange)}</td>
                        <td>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => onUpdateClick(print)}
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

const getStatusSelect = (id, value, options, onChange) => {
    return <select id={id} onChange={onChange} value={value}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
}

export default AcceptedList