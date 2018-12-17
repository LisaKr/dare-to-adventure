import React from "react";
import axios from "./axios";
import { connect } from "react-redux";


class Plan extends React.Component {
    constructor() {
        super();
    }

    render() {
        let city = this.props.city.replace(/\+/g, " ");

        return(
            <div className="plan-container">
                <h1> this is your plan for your travel to {city}</h1>
                {this.props.userActivities && this.props.userActivities.map(
                    a => {
                        return (
                            <div key={a.activity} className="user-activities">
                                day {a.day} || {a.category} || {a.activity}
                                <br/><br/>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }

}




function mapStateToProps(state) {

    return {
        city: state.city,
        userActivities: state.userActivities
    };
}



export default connect(mapStateToProps)(Plan);
