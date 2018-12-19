import React from "react";
// import axios from "./axios";
import { connect } from "react-redux";


import Logout from "./logout";
import Search from "./search";


import {getPopularCities} from "./actions.js";

class Setup extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log(" setup runs!!!!!!!!");
        this.props.dispatch(getPopularCities());

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

function mapStateToProps(state) {


    return {
        popularCities: state.popularCities
    };
}

export default connect(mapStateToProps)(Setup);
