import React from "react";
// import axios from "./axios";
import {connect} from "react-redux";


import Logout from "./logout";
import Search from "./search";
import PopularCities from "./popularCities";


import { getPopularCities } from "./actions.js";

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
            <div className = "setup-container" >
                <div className="setup-middle-flex">
                    <div className = "setup-middle" >
                        <h1 > Dare to adventure! < /h1>

                        <Search />
                    </div>
                </div>

                <div className="setup-sidebar">
                    <PopularCities/>
                    <div className="logout-setup"><Logout/></div>
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
