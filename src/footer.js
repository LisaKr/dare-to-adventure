import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Weather from "./weather";
import Logout from "./logout";


class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="footer-wa">
                <h4>Background images are provided by <a href="https://www.pexels.com/" className="no-underline" taget="_blank">Pexels API</a></h4>

                {/*DISPLAYING WEATHER*/}
                <Weather/>

                {/*IF THERE IS ANYTHING IN TH DATABASE FOR THIS USER ALREADY*/}
                {(this.props.userDidSomeWork || this.props.userActivities) &&
                    <div className="plan-message">
                        <Link to="/plan" className="no-underline"> View your travel plan! </Link>
                    </div>}
                {/*LOGOUT BUTTON*/}
                <div className="logout-wa"><Logout/></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDidSomeWork: state.userDidSomeWork,
        userActivities: state.userActivities
    };
}

export default connect(mapStateToProps)(Footer);
