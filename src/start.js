//starting out the whole react app

import React from 'react';
import ReactDOM from 'react-dom';
//logged out experience
import Welcome from './welcome';
//logged in experience
import App from './app';

//redux
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


//deciding which component to render depending on which route the user is taking
let component;

//the logged out path renders the component for the logged-out experience
//inside the logged out experience we can do more local hash routing
if (location.pathname === "/welcome") {
    component = <Welcome/>;
//the logged in path renders the component for the logged-in experience
//inside the logged in experience we can do more local browser routing
//only app is connected to redux
} else {
    component = (
        <Provider store={store}>
            <App />
        </Provider>);
}

//rendering the selected component
ReactDOM.render(
    component,
    document.querySelector('main')
);
