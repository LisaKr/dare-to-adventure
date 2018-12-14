import React from "react";
import { Link } from 'react-router-dom';


export default class Frontpage extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return(
            <div className="frontpage-container">
                <Link to="/registration"> Sign up </Link>
                <Link to="/login"> Log in </Link>
            </div>
        );
    }
}
