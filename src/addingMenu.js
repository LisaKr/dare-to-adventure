import React from "react";
import { connect } from "react-redux";
import axios from "./axios";


import { hideAddingMenu, addVenue, successfullyAdded, checkingActivitiesInDays, putActivitiesInState } from "./actions.js";




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
                                    let city = this.props.city.replace(/\+/g,' ');
                                    const promise = addVenue(city,
                                        this.props.selectedActivity,
                                        this.props.category,
                                        day,
                                        this.props.numOfDays);


                                    this.props.dispatch(promise);

                                    //after addVenue promise is fullfilled we are starting the then portion
                                    promise.then(() => {
                                        //and checking for activities in days
                                        this.props.dispatch(checkingActivitiesInDays(day));
                                        //and also resetting the list of activities in state
                                        axios.get("/get-activities/" + this.props.city).then((resp) => {
                                            console.log("new list of activities", resp.data);
                                            this.props.dispatch(putActivitiesInState(resp.data));
                                        });

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
