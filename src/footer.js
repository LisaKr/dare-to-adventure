import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Weather from "./weather";
import Logout from "./logout";

// import {showChangingLocation} from "./actions.js";


class Footer extends React.Component {
    constructor() {
        super();
        this.state = {changingLocationVisible: false};
    }

    showChangingLocation() {
        this.setState({
            changingLocationVisible: true
        });
    }

    hideChangingLocation() {
        this.setState({
            changingLocationVisible: false
        });
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

                {/*Change location*/}
                <div className="changing-location"
                    onClick={() => {
                        this.showChangingLocation();
                    }}>
                    Change your address/location
                </div>

                {/*LOGOUT BUTTON*/}
                <div className="logout-wa"><Logout/></div>

                {/*CHANGING LOCATION POP_UP*/}
                {this.state.changingLocationVisible &&
                    <div className="changing-location-popup">
                        <div className="closingButton" onClick={ () => {
                            this.hideChangingLocation();
                        }}> X </div>
                        <p>Enter your new location</p>
                        <input
                            name = "location"
                            type="text"
                            placeholder="New location"
                        />
                        <div className="addButton"
                            onClick={()=> {
                                
                            }}>
                            Update </div> <br/><br/>
                        <div className="addButton"> Remove current location </div>
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDidSomeWork: state.userDidSomeWork,
        userActivities: state.userActivities
        // showChangingLocation: state.showChangingLocation
    };
}

export default connect(mapStateToProps)(Footer);
