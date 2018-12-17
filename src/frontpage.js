import React from "react";
import { Link } from 'react-router-dom';

import Typist from 'react-typist';




export default class Frontpage extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    //hideWhenDone: true,

    render() {

        return(
            <div className="frontpage-container">
                <Typist className="MyTypist" avgTypingDelay={70} cursor={{  blink: true }} startDelay={800}>
                Go on an adventure
                </Typist>
                <div className="login-registr">
                    <Link to="/registration" className="no-underline"> <div className="frontpage-button">Sign up</div> </Link>
                    <Link to="/login" className="no-underline"> <div className="frontpage-button">Log in</div> </Link>
                </div>
            </div>
        );
    }
}
