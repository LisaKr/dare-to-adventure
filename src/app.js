//the parent component handling the routing and deciding which component to show inside of it

import React from "react";
import { BrowserRouter, Route} from 'react-router-dom';


import Setup from "./setup";
import WorkingArea from "./workingArea";
import Checker from "./checker";
import Plan from "./plan";
import Todo from "./todo";


export default class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <Route
                        exact path="/"
                        component={Checker}
                    />
                    <Route
                        path="/setup"
                        component={Setup}
                    />
                    <Route
                        path="/working-area"
                        component={WorkingArea}
                    />
                    <Route
                        path="/plan"
                        component={Plan}
                    />
                    <Route
                        path="/todo"
                        component={Todo}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
