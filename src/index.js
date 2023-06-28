import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import './index.css'
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const saveToLocalStorage = (state) => {
    const filteredState = {session: state.session}
    try {
        localStorage.setItem('state', JSON.stringify(filteredState));
    } catch (e) {
        console.error(e);
    }
};

const store = configureStore(loadFromLocalStorage())
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<ReduxProvider store={store}><Router><App /></Router></ReduxProvider>)

 // If you want to start measuring performance in your app, pass a function
 // to log results (for example: reportWebVitals(console.log))
 // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 reportWebVitals();