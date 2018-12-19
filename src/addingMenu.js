import React from "react";
import { connect } from "react-redux";
// import axios from "./axios";


import { hideAddingMenu, addVenue, successfullyAdded, checkingActivitiesInDays, putActivitiesInState, setDeletablePropertyToTrue, groupActivitiesForPlanPage } from "./actions.js";




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
                                        this.props.selectedActivityName,
                                        this.props.selectedActivityLocation,
                                        this.props.category,
                                        day,
                                        this.props.numOfDays);


                                    this.props.dispatch(promise);

                                    //after addVenue promise is fullfilled we are starting the then portion
                                    promise.then(() => {
                                        console.log("promise then running");
                                        //and checking for activities in days
                                        const promise1 = this.props.dispatch(checkingActivitiesInDays(day));
                                        //and also resetting the list of activities in state
                                        const promise2 = this.props.dispatch(putActivitiesInState(this.props.city));
                                        Promise.all([promise1, promise2]).then( ()=> {
                                            this.props.dispatch(groupActivitiesForPlanPage());
                                        });
                                    });

                                    for (let i =0; i<this.props.categoryResults.length; i++) {
                                        if (this.props.categoryResults[i].name == this.props.addingMenuName) {
                                            this.props.dispatch(setDeletablePropertyToTrue(this.props.categoryResults[i].name));
                                        }
                                    }





                                    this.props.dispatch(successfullyAdded(this.props.selectedActivityName));

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
        selectedActivityName: state.selectedActivityName,
        selectedActivityLocation: state.selectedActivityLocation,
        addedActivity: state.addedActivity,
        arrOfDays: state.arrOfDays,
        addingMenuName: state.addingMenuName,
        addingMenuLocation: state.addingMenuLocation
    };
}



export default connect(mapStateToProps)(AddingMenu);
