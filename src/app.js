import React from "react";
// import axios from "./axios";
import { BrowserRouter, Route} from 'react-router-dom';


import Setup from "./setup";
import WorkingArea from "./workingArea";
import Checker from "./checker";





export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }




    render() {


        return (

            <BrowserRouter>

                <div className="app-wrapper">
                    <div className="fake"></div>

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
                </div>
            </BrowserRouter>
        );
    }
}
