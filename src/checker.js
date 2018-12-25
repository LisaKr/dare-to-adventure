//a component running first thing in the logged experience (on the "/" route to decide where to redirect based on whether
//the user has already done some work in the app)

import React from "react";
import axios from "./axios";

export default class Checker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            let userDidSomeWork = await axios.get("/check-user-history");
            // if there is nothing in activities, redirect to the choosing page
            if (userDidSomeWork.data == "") {
                this.props.history.push('/setup');
            } else {
                this.props.history.push('/working-area');
            }
        } catch(err) {
            console.log("error in checking", err);
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
