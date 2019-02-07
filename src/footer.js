import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Weather from "./weather";
import Logout from "./logout";

import {setCoordinatesAndPutOptionsIntoDB, hideCategoryResults, showSubCategories} from "./actions.js";


class Footer extends React.Component {
    constructor() {
        super();
        this.state = {changingLocationVisible: false};
        this.showChangingLocation = this.showChangingLocation.bind(this);
        this.hideChangingLocation = this.hideChangingLocation.bind(this);
        this.handleInput = this.handleInput.bind(this);
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

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            <div className="footer-wa">
                <h4>Background images are provided by <a href="https://www.pexels.com/" className="no-underline" taget="_blank">Pexels API</a></h4>

                {/*DISPLAYING WEATHER*/}
                <Weather/>

                {/*IF THERE IS ANYTHING IN TH DATABASE FOR THIS USER ALREADY*/}
                {(this.props.userDidSomeWork || (this.props.userActivities && this.props.userActivities.length != 0)) &&
                    <div className="plan-message"
                    //hiding it when changing pages
                        onClick={ () => {
                            this.props.dispatch(hideCategoryResults());
                            this.props.dispatch(showSubCategories(null));
                        }}>
                        <Link to="/plan" className="no-underline"> View your travel plan </Link>
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

                {/*CHANGING LOCATION POP_UP --> Put it in a separate component*/}
                {this.state.changingLocationVisible &&
                    <div className="changing-location-popup">
                        <div className="closingButton" onClick={ () => {
                            this.hideChangingLocation();
                        }}> X </div>
                        <p>Enter your new location</p>
                        <input
                            name = "address"
                            type="text"
                            placeholder="New location"
                            defaultValue={this.props.address}
                            onChange={this.handleInput}
                        />
                        <div className="addButton"
                            onClick={()=> {
                                this.props.dispatch(setCoordinatesAndPutOptionsIntoDB(this.state.address, this.props.city, this.props.numOfDays));
                                this.hideChangingLocation();
                            }}>
                            Update </div> <br/><br/>
                        <div className="addButton centered"
                            onClick = {()=>{
                                this.props.dispatch(setCoordinatesAndPutOptionsIntoDB(undefined, this.props.city, this.props.numOfDays));
                                this.hideChangingLocation();
                            }}>
                            Delete location and search whole city instead</div>
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDidSomeWork: state.userDidSomeWork,
        userActivities: state.userActivities,
        city: state.city,
        numOfDays: state.numOfDays,
        address: state.address
    };
}

export default connect(mapStateToProps)(Footer);
