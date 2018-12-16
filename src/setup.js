import React from "react";
import axios from "./axios";

import Logout from "./logout";
import Search from "./search";




export default class Setup extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log(" setup runs!!!!!!!!");
    }



    render() {
        return (
            //incremental search and choosing how many days
            <div className="setup-container">
                <div className="setup">
                    <h2> Lets set up your adventure! </h2>
                    <Search/>



                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Logout/>
                </div>
            </div>
        );
    }
}
