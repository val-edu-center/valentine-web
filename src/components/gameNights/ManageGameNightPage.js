import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import * as gameNightActions from "../../redux/actions/gameNightActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import GameNightForm from "./GameNightForm";
import { newGameNight } from '../../model/mockData'
import Spinner from "../common/Spinner";
import Parse from 'parse/dist/parse.min.js'
import { toast } from "react-toastify";

const ManageGameNightPage = ({ showSpinner, gameNights, actions, history, ...props }) => {
    //TODO replace this with persistene
    const possibleOptions = ['Super Mario Party','Mario Kart 8 Deluxe','Overcooked','Gang Beasts','Jenga','Ping Pong','Super Smash','Jackbox Party Pack','Uno!','Monopoly Deal','Brawlhalla','Pico Park','Dungeons and Dragons','Marble','Risk: Global Domination','Survivor Pong','Ring The Bells']
    //This is how React Hooks add state to function components
    const [gameNight, setGameNight] = useState({ ...props.gameNight })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)
    useEffect(() => {
        if (gameNights.length === 0) {
            actions.gameNight.loadAllNights().catch(error => {
                alert("Loading game nights failed " + error)
            })
        }

        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [props.gameNight])

    function changeOptionList(gameNight, option, checked) {
        const oldParseObject = gameNight.parseObject
        if (option === 'select-all') {
            const newOptions = checked ? possibleOptions : []
            oldParseObject.set("options", newOptions)
            return {
                ...gameNight,
                options: newOptions,
                parseObject: oldParseObject
            }

        } else {
            const newOptions = checked ? [...gameNight.options, option] : gameNight.options.filter(o => o !== option)
            oldParseObject.set("options", newOptions)
            return {
                ...gameNight,
                options: newOptions,
                parseObject: oldParseObject
            }
        }
    }

    function handleOptionListChange(event) {
        const option = event.target.name
        const newGameNight = changeOptionList(gameNight, option, event.target.checked)
        setGameNight(newGameNight)

    }

    function changeDate(gameNight, newDate) {
        const oldParseObject = gameNight.parseObject
        oldParseObject.set("date", new Date(newDate + "T00:00:00.000-06:00"))
        return {
            ...gameNight,
            date: newDate,
            parseObject: oldParseObject
        }
    }

    function handleDateChange(event) {
        const newDate = event.target.value
        const newGameNight = changeDate(gameNight, newDate)
        setGameNight(newGameNight)

    }

    function formIsValid() {
        const { date, options } = gameNight
        const errors = {}

        if (!date) errors.date = "Date is required"
        if (options.length === 0) errors.options = "Options are required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)
        actions.gameNight.saveGameNight(gameNight).then(() => {
            toast.success("Game night saved.")
            history.push("/gamenights")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }

    return showSpinner ? (<Spinner />) : (<GameNightForm gameNight={gameNight} errors={errors} onDateChange={handleDateChange} onOptionListChange={handleOptionListChange} onSave={handleSave} saving={saving} possibleOptions={possibleOptions}></GameNightForm>)

}

ManageGameNightPage
    .propTypes = {
    gameNight: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    gameNights: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    showSpinner: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
    // this is available bc /:slug in App.js
    const slug = ownProps.match.params.slug
    const gameNight = slug && state.gameNights.length > 0 ? getGameNightById(state.gameNights, slug) : createNewGameNight()

    var showSpinner = false
    if (state.apiCallsInProgress > 0) {
        showSpinner = true
    } else if (showSpinner) {
        showSpinner = false
    }

    return {
        gameNights: state.gameNight.dates,
        gameNight,
        showSpinner: showSpinner,
        errors: []
    }
}

function getGameNightById(gameNights, id) {
    return gameNights.find(gameNight => gameNight.id === id) || null
}

function createNewGameNight() {
    const gameNight = newGameNight
    gameNight.parseObject = new Parse.Object("GameNight")
    return gameNight
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gameNight: bindActionCreators(gameNightActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageGameNightPage);