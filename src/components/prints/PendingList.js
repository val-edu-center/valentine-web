import React from "react"

const PendingList = ({ pendingPrints, onSubmitClick, onDeleteClick, onApproveOrDeclineChange }) => {
    return (
        <table className="table" id='pending-table'>
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Date Submitted</th>
                    <th>Color</th>
                    <th>Printer</th>
                    <th>Desginer</th>
                    <th>Description</th>
                    <th>Approve</th>
                    <th>Decline</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                {pendingPrints.map(print => {
                    const styleColor = print.color === "White" ? "Black" : print.color
                    return <tr key={print.id}>
                        <td>{print.clientUsername}</td>
                        <td>{print.createdAt.toDateString()}</td>
                        <td style={{color:styleColor}}>{print.color}</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{print.description}</td>
                        <td><input onChange={onApproveOrDeclineChange} name={"Approve-"+print.id} checked={print.approved} type="radio"></input></td>
                        <td><input onChange={onApproveOrDeclineChange} name={"Decline-"+print.id} checked={print.declined} type="radio"></input></td>
                        <td>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => onSubmitClick(print)}
                            >
                                Submit
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => onDeleteClick(print)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default PendingList