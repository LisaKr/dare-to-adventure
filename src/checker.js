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
            console.log("from app","userDidSomeWork", userDidSomeWork, "this.props.history", this.props.history);
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
            hello
            </div>
        );
    }
}
