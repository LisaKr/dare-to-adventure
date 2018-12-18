import React from "react";
import { connect } from "react-redux";
import axios from "./axios";

import {
    hideCategoryResults,
    getVenueDetails,
    getCategoryResults,
    showAddingMenu,
    setActivityInState,
    putActivitiesInState,
    checkingActivitiesInDays,
    showAddButtonAtFirst}
    from "./actions.js";

import AddingMenu from "./AddingMenu";

class CategoryResults extends React.Component {
    constructor() {
        super();

        this.deleteActivity = this.deleteActivity.bind(this);

    }

    async deleteActivity(activityName) {
        // console.log("activity in delete in category", activity);
        // console.log(activity == this.props.selectedActivity, activity, this.props.selectedActivity);
        //deleting
        await axios.get("/delete/" + activityName);

        //resetting user activities in state
        let resp = await axios.get("/get-activities/" + this.props.city);
        console.log("new list of activities in delete in categories", resp.data);
        this.props.dispatch(putActivitiesInState(resp.data));

        //then also after deleting I want to check whether any day has become available
        for (let i = 1; i<this.props.numOfDays; i++) {
            console.log("checking the loop", i);
            await this.props.dispatch(checkingActivitiesInDays(i));
        }

        //showing add button again as something has become available again
        this.props.dispatch(showAddButtonAtFirst());

        //but i also need to set the property of this activity to deletable false
        for (let i =0; i<this.props.categoryResults.length; i++) {
            if (this.props.categoryResults[i].name == activityName) {
                console.log("hoorah!!!", this.props.categoryResults[i].name, activityName);
                this.props.dispatch(showAddButtonAtFirst());
                this.props.categoryResults[i].deletable = false;
            }
        }
    }




    render() {

        return(
            <div className="category-results-container">

                <div className="closingButton" onClick={ () => {this.props.dispatch(hideCategoryResults());}}> X </div>

                {this.props.categoryResults && this.props.categoryResults.map(

                    r => {


                        return (
                            <div key={r.id} className="result">

                                <div className="result-info" onClick={ () => {
                                    this.props.dispatch(getVenueDetails(r.id));
                                }}>
                                    {r.name}, {r.location}
                                </div>


                                {(this.props.showAddButton && !r.deletable) &&
                                <div className="addButton" onClick={ () => {
                                    this.props.dispatch(setActivityInState(r.name, r.location));
                                    this.props.dispatch(showAddingMenu(r.name, r.location));
                                    //create state property with an array of full days
                                }}>
                                Add to list
                                </div>}


                                {r.deletable &&
                                    <div className="deleteButton" onClick = { () => {
                                        this.deleteActivity(r.name);
                                    }}>
                                    Delete
                                    </div>}



                            </div>
                        );
                    }
                )}

                {/*SHOWING THE MENU WITH DAYS WHEN YOU'RE ADDING AN ACTIVITY*/}
                {this.props.showMenu &&  <AddingMenu/>}

                <div className="moreButton"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, this.props.category, this.props.offset));
                    }}>
                MORE
                </div>
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
        showAddButton: state.showAddButton,
        showAddingWarningButton: state.showAddingWarningButton,
        showDeleteButton: state.showDeleteButton,
        userActivities: state.userActivities
    };
}



export default connect(mapStateToProps)(CategoryResults);
