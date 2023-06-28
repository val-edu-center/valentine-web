import * as printApi from "../../api/printApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { LOAD_ALL_PRINTS_SUCCESS, CREATE_PRINT_SUCCESS, UPDATE_PRINT_SUCCESS, DELETE_PRINT_OPTIMISTIC } from "./actionTypes"

export function loadAllPrintsSuccess(prints) {
    return { type: LOAD_ALL_PRINTS_SUCCESS, prints }
}

export function createPrintSuccess(print) {
    return { type: CREATE_PRINT_SUCCESS, print }
}

export function updatePrintSuccess(print) {
    return { type: UPDATE_PRINT_SUCCESS, print }
}

export function deletePrintOptimistic(print) {
    return { type: DELETE_PRINT_OPTIMISTIC, print }
}

export function loadAllPrints() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return printApi
        .getAllPrints()
        .then(prints => {
            dispatch(loadAllPrintsSuccess(prints))
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function savePrint(print) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return printApi
        .savePrint(print)
        .then(updatedPrint => {
            if (print.id) {
                dispatch(updatePrintSuccess(updatedPrint))
            } else {
                dispatch(createPrintSuccess(updatedPrint))
            }
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}
export function updatePrint(print) {
    return function (dispatch) {
        return dispatch(updatePrintSuccess(print))
    }
}

export function deletePrint(print) {
    return function (dispatch) {
        dispatch(deletePrintOptimistic(print))
        return printApi.deletePrint(print)
    }
}