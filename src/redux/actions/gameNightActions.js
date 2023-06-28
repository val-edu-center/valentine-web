import * as gameNightApi from "../../api/gameNightApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { CREATE_GAME_NIGHT_SUCCESS, LOAD_ALL_GAME_NIGHTS_SUCCESS, LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS, UPDATE_GAME_NIGHT_SUCCESS } from "./actionTypes"

export function loadGameNightsSuccess(gameNights) {
    return { type: LOAD_ALL_GAME_NIGHTS_SUCCESS, gameNights}
}
export function loadGameNightVotesSuccess(gameNightVotes) {
    return { type: LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS, gameNightVotes}
}
export function createGameNightSuccess(gameNight) {
    return { type: CREATE_GAME_NIGHT_SUCCESS, gameNight}
}
export function updateGameNightSuccess(gameNight) {
    return { type: UPDATE_GAME_NIGHT_SUCCESS, gameNight}
}

export function loadAllNights() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return gameNightApi
        .getAllNights()
        .then(gameNights => {
            dispatch(loadGameNightsSuccess(gameNights));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}
export function loadAllVotes() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return gameNightApi
        .getAllVotes()
        .then(gameNightVotes => {
            dispatch(loadGameNightVotesSuccess(gameNightVotes));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}
export function saveGameNight(gameNight) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return gameNightApi
        .saveGameNight(gameNight)
        .then(savedGameNight => {
            if (gameNight.id) {
                dispatch(updateGameNightSuccess(savedGameNight))
            } else {
                dispatch(createGameNightSuccess(savedGameNight))
            }
        }).catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}
export function updateGameNight(gameNight) {
    return function (dispatch) {
        return dispatch(updateGameNightSuccess(gameNight))
    }
}