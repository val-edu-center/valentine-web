import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Navigate } from "react-router-dom"
import { bindActionCreators } from 'redux'
import * as printActions from "../../redux/actions/printActions"
import AcceptedList from "./AcceptedList"
import HistoryList from "./HistoryList"
import PendingList from "./PendingList"
import { toast } from "react-toastify"
import Spinner from "../common/Spinner"

const PrintsPage = ({ prints, actions, loading}) => {

    const [redirectToAddPrintPage, setRedirectToAddPrintPage] = useState(false)

    useEffect(() => {
        if (prints.length === 0) {
            actions.print.loadAllPrints().catch(error => {
                alert("Loading 3D prints failed " + error)
            })
        }
        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [])

    const pendingPrints = prints.filter(print => print.status === "PENDING")
    const acceptedPrints = prints.filter(print => print.status === "DESIGNING" || print.status === "PRINTING")
    const historicalPrints = prints.filter(print => print.status === "DECLINED" || print.status === "COMPLETED")

    const handleApproveOrDeclineChange = event => {
        const name = event.target.name.split('-')[0]
        const printId = event.target.name.split('-')[1]
        const targetPrint = prints.find(print => print.id === printId)
        if (name === "Approve") {
            const newPrint = {
                ...targetPrint,
                approved: true,
                declined: false
            }
            actions.print.updatePrint(newPrint)
        } else {
            const newPrint = {
                ...targetPrint,
                approved: false,
                declined: true
            }
            actions.print.updatePrint(newPrint)
        }

    }

    const handleSubmitPrint = print => {
        if (print.approved) {
            const parseObject = print.parseObject
            parseObject.set("approvedAt", new Date())
            parseObject.set("status", "DESIGNING")
            const newPrint = {
                ...print,
                parseObject
            }
            actions.print.savePrint(newPrint).then(
                updatedPrint => toast.success("Print submitted")
            ).catch(
                error => toast.error('Submit failed. ' + error.message, { autoClose: false })
            )

        } else if (print.declined) {
            const parseObject = print.parseObject
            parseObject.set("status", "DECLINED")
            const newPrint = {
                ...print,
                parseObject
            }
            actions.print.savePrint(newPrint).then(
                updatedPrint => toast.success("Print submitted")
            ).catch(
                error => toast.error('Submit failed. ' + error.message, { autoClose: false })
            )
        }
    }

    const handleDeletePrint = print => {
        toast.success("Print deleted")
        actions.print.deletePrint(print).catch(
            error => toast.error('Delete failed. ' + error.message, { autoClose: false })
        )
    }

    const handleUpdatePrint = print => {
        actions.print.savePrint(print).then(
            updatedPrint => toast.success("Print updated")
        ).catch(
            error => toast.error('Update failed. ' + error.message, { autoClose: false })
        )
    }

    const handleStatusChange = event => {
        const newStatus = event.target.value
        const printId = event.target.id
        const targetPrint = prints.find(print => print.id === printId)
        const parseObject = targetPrint.parseObject
        parseObject.set("status", newStatus)
        const newPrint = {
            ...targetPrint,
            parseObject
        }
        actions.print.updatePrint(newPrint)
    }
    const approvedStatuses = ["DESIGNING", "PRINTING", "COMPLETED"]
    return  loading ? <Spinner/> :(
        <>
            {redirectToAddPrintPage && <Navigate to="/print/" />}
            <h2>3D Printing</h2>
            <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={() => setRedirectToAddPrintPage(true)}>
                Request 3D Print
            </button>
            <div>
                <h3>Pending</h3>
                <PendingList onApproveOrDeclineChange={handleApproveOrDeclineChange} pendingPrints={pendingPrints} onDeleteClick={handleDeletePrint} onSubmitClick={handleSubmitPrint}></PendingList>
            </div>
            <div>
                <h3>Accepted</h3>
                <AcceptedList acceptedPrints={acceptedPrints} onStatusChange={handleStatusChange} onUpdateClick={handleUpdatePrint} statusOptions={approvedStatuses}></AcceptedList>
            </div>
            <div>
                <h3>History</h3>
                <HistoryList historicalPrints={historicalPrints}></HistoryList>
            </div>
        </>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        prints: state.prints,
        loading: state.apiCallsInProgress > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            print: bindActionCreators(printActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrintsPage)
