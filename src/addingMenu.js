import React from "react";
import { connect } from "react-redux";

import { hideAddingMenu, addVenue } from "./actions.js";


class AddingMenu extends React.Component {
    constructor() {
        super();
    }


    render() {

        let arrOfDays = [];

        for (let i = 0; i<this.props.numOfDays; i++) {
            arrOfDays.push(i+1);
        }

        return (
            <div className="adding-menu">
                Which day would you like to add this activity to?
                <br/>
                {this.props.numOfDays && arrOfDays.map(
                    day => {
                        return(
                            <div key={day} className="day"
                                onClick={ () => {
                                    this.props.dispatch(addVenue(
                                        this.props.city,
                                        this.props.selectedActivity,
                                        this.props.category,
                                        day,
                                        this.props.numOfDays));
                                }}>
                                 day {day}
                            </div>
                        );
                    }
                )}
                <br/>
                <button onClick={()=> {this.props.dispatch(hideAddingMenu());}}> Cancel </button>
            </div>
        );
    }

}








function mapStateToProps(state) {

    return {
        city: state.city,
        category: state.category,
        offset: state.offset,
        categoryResults: state.categoryResults,
        numOfDays: state.numOfDays,
        showMenu: state.showMenu,
        selectedActivity: state.selectedActivity
    };
}



export default connect(mapStateToProps)(AddingMenu);
