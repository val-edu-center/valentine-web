import React from "react";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ( {session} ) => {
    const rightJustifiedStyle = { float: 'right'}
    // const isBanker = session.roles.isBanker
    // const is3DClub = session.roles.is3DClubPrinter || session.roles.is3DClubDesigner
    const isDirector = session.roles.isDirector
    const isStaff = session.roles.isStaff
    return (
        <nav>
            <NavLink to="/" exact="true" >Home</NavLink> 
            {" | "}
            <NavLink to="/about">About</NavLink>
            {session.sessionToken && " | "}
            {session.sessionToken && <NavLink to="/accounts">Accounts</NavLink>}
            {session.sessionToken && (isDirector || isStaff) && " | "}
            {session.sessionToken && (isDirector || isStaff) && <NavLink to="/schedules" >Schedules</NavLink>}
            {session.sessionToken && (isDirector || isStaff) && " | "}
            {session.sessionToken && (isDirector || isStaff) && <NavLink to="/gamenights" >Game Nights</NavLink>}
            {session.sessionToken && " | "}
            {session.sessionToken && <NavLink to="/prints" >3D Printing</NavLink>}
            {/* {isBanker && " | "} 
            {isBanker && <NavLink to="/bank">Bank</NavLink>} 
            {isDirector && " | "} 
            {isDirector && <NavLink to="/bank">Members</NavLink>} 
            {is3DClub && " | "} 
            {is3DClub && <NavLink to="/bank">3D Prints</NavLink>}  */}
            {!session.sessionToken && <NavLink to="/login" style={rightJustifiedStyle}>Login</NavLink>} 
            {session.sessionToken && <NavLink to="/logout" style={rightJustifiedStyle}>Logout</NavLink>}  
        </nav>
    )
    
}

function mapStateToProps(state) {
    return {
        session: state.session,
    }
}

Header.propTypes = {
    session: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Header
    );