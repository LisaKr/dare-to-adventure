//menu presented after clicking on "add to list". user is asked to which day they want to add the activity

import React from "react";
import { connect } from "react-redux";

import {
    hideAddingMenu,
    addVenue,
    successfullyAdded,
    checkingActivitiesInDays,
    putActivitiesInState,
    setDeletablePropertyToTrue,
    groupActivitiesForPlanPage,
    checkIfActivityAlreadyAddedToThisDay,
    showAddingError,
    hideAddingError
} from "./actions.js";

import AddingError from "./addingError.js";


class AddingMenu extends React.Component {

    render() {
        return (
            <div className="adding-menu">
                <p>Which day would you like to add this activity to?</p>
                <br/>
                <div className="days">
                    {/*for every day which is available in the arrOfDays (meaning which is still not completely full)*/}
                    {this.props.arrOfDays && this.props.arrOfDays.sort((a,b) => { return a-b;}).map(
                        day => {
                            return(
                                <div key={day} className="day"
                                    onClick={ () => {
                                        {/*first checking if the selected day already has the activity added to it*/}
                                        let prom = this.props.dispatch(checkIfActivityAlreadyAddedToThisDay(this.props.selectedActivityName, this.props.city, day));

                                        {/*after the checking is done and the result is set into state*/}
                                        prom.then(()=>{
                                            if (this.props.activityAlreadyAdded) {
                                                this.props.dispatch(showAddingError());
                                            } else {
                                                {/*if the activity was not yet added we dispatch an action which inserts the selected activity into database*/}
                                                const promise = addVenue(this.props.city,
                                                    this.props.selectedActivityName,
                                                    this.props.selectedActivityLocation,
                                                    this.props.category,
                                                    day);
                                                //first dispatching the promise. so we can wait for it to be fulfilled and set a callback on it
                                                this.props.dispatch(promise);

                                                //after addVenue promise is dispatched and resolved
                                                promise.then(() => {
                                                //checking for activities in the day we just added the activity to to see if it's now full
                                                    const promise1 = this.props.dispatch(checkingActivitiesInDays(day));
                                                    //and also resetting the list of activities in state to now include the newly added activity
                                                    const promise2 = this.props.dispatch(putActivitiesInState(this.props.city));
                                                    //after it is done we group activities by days for the plan page
                                                    Promise.all([promise1, promise2]).then(()=> {
                                                        this.props.dispatch(groupActivitiesForPlanPage());
                                                    });
                                                });
                                                //after the venue is added and activities are put in state we are going through all the displayed
                                                //category results and checking whether any of them was the one we just added
                                                //if it's true we are changing it's deletable property so that the add/delete button toggling happens
                                                for (let i =0; i<this.props.categoryResults.length; i++) {
                                                    if (this.props.categoryResults[i].name == this.props.selectedActivityName) {
                                                        this.props.dispatch(setDeletablePropertyToTrue(this.props.categoryResults[i].name));
                                                    }
                                                }
                                                //showing the pop-up about adding the activity and hiding the menu with the day selection
                                                this.props.dispatch(hideAddingMenu());
                                                this.props.dispatch(successfullyAdded(this.props.selectedActivityName));
                                            }
                                        });
                                    }}>
                                    <p>Day {day}</p>
                                </div>
                            );
                        }
                    )}
                </div>
                <br/>
                <button onClick={()=> {
                    this.props.dispatch(hideAddingMenu());
                    this.props.dispatch(hideAddingError());
                }}> Cancel </button>

                {/*this is only shown if this activity is already added to this day*/}
                {this.props.showAddingError && <AddingError/>}
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
        selectedActivityName: state.selectedActivityName,
        selectedActivityLocation: state.selectedActivityLocation,
        arrOfDays: state.arrOfDays,
        activityAlreadyAdded: state.activityAlreadyAdded,
        showAddingError: state.showAddingError
    };
}

export default connect(mapStateToProps)(AddingMenu);
