import React from "react";
import { connect } from "react-redux";
// import axios from "./axios";


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
    hideAddingError} from "./actions.js";




class AddingMenu extends React.Component {
    constructor() {
        super();
    }


    render() {

        return (
            <div className="adding-menu">
                <p>Which day would you like to add this activity to?</p>
                <br/>
                {this.props.numOfDays && this.props.arrOfDays.sort().map(
                    day => {
                        return(
                            <div key={day} className="day"

                                onClick={ () => {
                                    let prom = this.props.dispatch(checkIfActivityAlreadyAddedToThisDay(this.props.selectedActivityName, this.props.city, day));

                                    prom.then(()=>{
                                        console.log("checking for activity ran for this parameters", this.props.selectedActivityName);
                                        if (this.props.activityAlreadyAdded) {
                                            this.props.dispatch(showAddingError());
                                        } else {

                                            let city = this.props.city.replace(/\+/g,' ');
                                            const promise = addVenue(city,
                                                this.props.selectedActivityName,
                                                this.props.selectedActivityLocation,
                                                this.props.category,
                                                day,
                                                this.props.numOfDays);

                                            console.log("promise", promise);
                                            this.props.dispatch(promise);

                                            //after addVenue promise is fullfilled we are starting the then portion
                                            promise.then(() => {
                                                console.log("promise then running");
                                                //and checking for activities in days
                                                const promise1 = this.props.dispatch(checkingActivitiesInDays(day));
                                                //and also resetting the list of activities in state
                                                const promise2 = this.props.dispatch(putActivitiesInState(this.props.city));
                                                Promise.all([promise1, promise2]).then( ()=> {
                                                    console.log("promise all in adding menu runs");
                                                    this.props.dispatch(groupActivitiesForPlanPage());
                                                });
                                            });

                                            for (let i =0; i<this.props.categoryResults.length; i++) {
                                                if (this.props.categoryResults[i].name == this.props.selectedActivityName) {
                                                    this.props.dispatch(setDeletablePropertyToTrue(this.props.categoryResults[i].name));
                                                }
                                            }

                                            this.props.dispatch(successfullyAdded(this.props.selectedActivityName));

                                            this.props.dispatch(hideAddingMenu());

                                        }
                                    });

                                }}>

                                 day {day}

                            </div>
                        );
                    }
                )}
                <br/>
                <button onClick={()=> {
                    this.props.dispatch(hideAddingMenu());
                    this.props.dispatch(hideAddingError());
                }}> Cancel </button>

                {this.props.showAddingError && <div className="adding-error"> Oops! Seems you already added it to that day!</div>}
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
        // addedActivity: state.addedActivity,
        arrOfDays: state.arrOfDays,
        addingMenuName: state.addingMenuName,
        addingMenuLocation: state.addingMenuLocation,
        activityAlreadyAdded: state.activityAlreadyAdded,
        showAddingError: state.showAddingError
    };
}



export default connect(mapStateToProps)(AddingMenu);
