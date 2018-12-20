import React from "react";
// import axios from "./axios";
import { BrowserRouter, Route} from 'react-router-dom';


import Setup from "./setup";
import WorkingArea from "./workingArea";
import Checker from "./checker";
import Plan from "./plan";
import Todo from "./todo";




export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
