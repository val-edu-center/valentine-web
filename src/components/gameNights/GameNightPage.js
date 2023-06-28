import React from "react"
import { connect } from 'react-redux'
import * as gameNightActions from "../../redux/actions/gameNightActions"
import { bindActionCreators } from 'redux'
import { Navigate } from 'react-router-dom'
import GameNightPieChart from "./GameNightPieChart"
import PropTypes from "prop-types"
import Spinner from "../common/Spinner"

class GameNightPage extends React.Component {
    state = {
        redirectToAddGameNightPage: false
    }
    componentDidMount() {
        const { gameNight, session, actions } = this.props
        const isAdmin = session.roles.isStaff || session.roles.isDirector
        if (isAdmin && gameNight.dates.length === 0 && session.sessionToken) {
            actions.gameNight.loadAllNights().catch(error => {
                alert("Loading game night dates failed " + error)
            })
        }
        if (isAdmin && gameNight.votes.length === 0 && session.sessionToken) {
            actions.gameNight.loadAllVotes().catch(error => {
                alert("Loading game night votes failed " + error)
            })
        }
    }

    render() {
        return this.props.loading ? <Spinner/> : (
            <>
                {(!this.props.session.sessionToken || !(this.props.session.roles.isStaff || this.props.session.roles.isDirector)) && <Navigate to="/unauthorized" />}
                {this.state.redirectToAddGameNightPage && <Navigate to="/gamenight/" />}
                <h2>Game Nights</h2>
                <button style={{ marginBottom: 20 }} className="btn btn-primary" onClick={ () => this.setState({ redirectToAddGameNightPage: true})}>
                     Add Game Night
                 </button>
                {this.props.gameNight.dates.map(gameNight => {
                    const date = gameNight.date
                    const dateString = date.toDateString()
                    const votes = this.props.gameNight.votes.filter(
                        vote => isSameGameNightDate(date, new Date(vote.gameNightDate))
                    )
                    //TODO create list component and add delete button
                    return <GameNightPieChart key={gameNight.id} title={dateString} votes={votes}></GameNightPieChart>
                })}
            </>
        )
    }
}

function isSameGameNightDate(gameNightDate, gameNightVoteDate) {
    return gameNightDate.getMonth() === gameNightVoteDate.getMonth() && gameNightDate.getDate() === gameNightVoteDate.getDate() && gameNightDate.getYear() === gameNightVoteDate.getYear()
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        gameNight: state.gameNight,
        session: state.session,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gameNight: bindActionCreators(gameNightActions, dispatch)
        }
    }
}

GameNightPage.propTypes = {
    gameNight: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GameNightPage);