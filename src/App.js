import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/home/HomePage'
import AboutPage from './components/about/AboutPage'
import Header from './components/common/Header'
import LoginPage from './components/login/LoginPage'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import AccountsPage from './components/accounts/AccountsPage'
import UnauthorizedPage from './components/common/UnauthorizedPage'
import LogoutPage from './components/logout/LogoutPage'
import Parse from 'parse/dist/parse.min.js'
import GameNightPage from './components/gameNights/GameNightPage'
import ManageGameNightPage from './components/gameNights/ManageGameNightPage'
import ManageAccountPage from './components/accounts/ManageAccountPage'
import PrintsPage from './components/prints/PrintsPage'
import ManagePrintPage from './components/prints/ManagePrintPage'
import SchedulePage from './components/schedule/SchedulesPage'
import ManageSchedulePage from './components/schedule/ManageSchedulePage'

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
const PARSE_MASTERKEY = process.env.REACT_APP_PARSE_MASTERKEY
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL
Parse.masterKey = PARSE_MASTERKEY

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage/>}></Route>
                <Route path="/about" element={<AboutPage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/logout" element={<LogoutPage/>}></Route>
                <Route path="/accounts" element={<AccountsPage/>}></Route>
                <Route path="/account/:slug"  element={<ManageAccountPage/>}></Route>
                <Route path="/account/" element={<ManageAccountPage/>}></Route>
                <Route path="/gamenights" element={<GameNightPage/>}></Route>
                <Route path="/schedules" element={<SchedulePage/>}></Route>
                <Route path="/schedule/" element={<ManageSchedulePage/>}></Route>
                <Route path="/gamenight/" element={<ManageGameNightPage/>}></Route>
                <Route path="/prints" element={<PrintsPage/>}></Route>
                <Route path="/print/:slug" element={<ManagePrintPage/>}></Route>
                <Route path="/print/" element={<ManagePrintPage/>}></Route>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}></Route>
            </Routes>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    )
}

export default App