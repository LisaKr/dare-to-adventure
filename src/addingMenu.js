import React from "react";
import { connect } from "react-redux";

import { hideAddingMenu, addVenue, successfullyAdded, checkingActivitiesInDays, hideAddButton } from "./actions.js";




class AddingMenu extends React.Component {
    constructor() {
        super();
    }


    render() {

        return (
            <div className="adding-menu">
                Which day would you like to add this activity to?
                <br/>
                {this.props.numOfDays && this.props.arrOfDays.map(
                    day => {
                        return(
                            <div key={day} className="day"
                                onClick={ () => {
                                    const promise = addVenue(this.props.city,
                                        this.props.selectedActivity,
                                        this.props.category,
                                        day,
                                        this.props.numOfDays);


                                    this.props.dispatch(promise);

                                    promise.then(() => {
                                        this.props.dispatch(checkingActivitiesInDays(day));
                                    });

                                    this.props.dispatch(successfullyAdded(this.props.selectedActivity));

                                    this.props.dispatch(hideAddingMenu());

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
        selectedActivity: state.selectedActivity,
        addedActivity: state.addedActivity,
        arrOfDays: state.arrOfDays,

    };
}



export default connect(mapStateToProps)(AddingMenu);
