//component presented to new users and registered users who haven't created any plans

import React from "react";
import {connect} from "react-redux";

import Logout from "./logout";
import Search from "./search";
import PopularCities from "./popularCities";

import {deleteOptionsFromTable} from "./actions.js";

class Setup extends React.Component {
    //a safeguard for the edge case that user deletes everything and then manually goes to setup --> so that there is no doubling
    componentDidMount() {
        this.props.dispatch(deleteOptionsFromTable());
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
