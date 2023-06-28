import { CLEAR_GAME_NIGHT, CREATE_GAME_NIGHT_SUCCESS, LOAD_ALL_GAME_NIGHTS_SUCCESS, LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS, UPDATE_GAME_NIGHT_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function gameNightReducer(state = initialState.gameNight, action) {
    switch (action.type) {
        case CREATE_GAME_NIGHT_SUCCESS:
            return { ...state, dates: [...state.dates, action.gameNight]}
        case UPDATE_GAME_NIGHT_SUCCESS:
            return { ...state, dates: state.dates.map (gameNight => gameNight.id === action.gameNight.id ? action.gameNight : gameNight )}
        case LOAD_ALL_GAME_NIGHTS_SUCCESS:
            return { ...state, dates: action.gameNights}
        case LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS:
            return { ...state, votes: action.gameNightVotes }
        case CLEAR_GAME_NIGHT:
            return initialState.gameNight
        default:
            return state
    }
}