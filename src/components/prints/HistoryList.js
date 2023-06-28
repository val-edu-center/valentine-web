import React from "react"

const HistoryList = ({historicalPrints}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Date of Final Action</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Printer</th>
                    <th>Desginer</th>
                    <th>Color</th>
                    <th>Item Description</th>
                </tr>
            </thead>
            <tbody>
                {historicalPrints.map(print => {
                    const styleColor = print.color === "White" ? "Black" : print.color
                    return <tr key={print.id}>
                        <td>{print.clientUsername}</td>
                        <td>{print.parseObject.updatedAt.toDateString()}</td>
                        <td>{print.status}</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td style={{color:styleColor}}>{print.color}</td>
                        <td>{print.description}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default HistoryList