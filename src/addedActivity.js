//a pop-up showing that the activity the user chose was added to their list

import React from "react";
import { connect } from "react-redux";

import {hideAddedActivity} from "./actions.js";

class addedActivity extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="added-activity-container">
                <div className="closingButton" onClick={ () => {this.props.dispatch(hideAddedActivity());}}> X </div>
                {this.props.addedActivity} was added to your list!
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        addedActivity: state.addedActivity
    };
}

export default connect(mapStateToProps)(addedActivity);
