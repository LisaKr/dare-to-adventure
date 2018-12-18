import React from "react";
import { connect } from "react-redux";
// import axios from "./axios";

import {
    hideCategoryResults,
    getVenueDetails,
    getCategoryResults,
    showAddingMenu,
    setActivityInState}
    from "./actions.js";

import AddingMenu from "./AddingMenu";

class CategoryResults extends React.Component {
    constructor() {
        super();

        // this.checkIfActivityAlreadyAdded = this.checkIfActivityAlreadyAdded.bind(this);
    }


    // checkIfActivityAlreadyAdded(activityObject) {
    //
    //
    //     if (this.props.userActivities) {
    //
    //         for (let i =0; i<this.props.userActivities.length; i++) {
    //             console.table([activityObject.name + " || " + activityObject.location,
    //                 this.props.userActivities[i].activity,
    //                 this.props.userActivities[i].activity == activityObject.name + " || " + activityObject.location]);
    //
    //             if (this.props.userActivities[i].activity == activityObject.name + " || " + activityObject.location) {
    //                 //this is not addable --> delete button
    //                 //add a property addable to activity and i will check for it in the render
    //                 return true;
    //             }
    //         }
    //
    //         return false;
    //     }
    //
    // }


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


                                {this.props.showAddButton &&
                                <div className="addButton" onClick={ () => {
                                    this.props.dispatch(setActivityInState(r.name, r.location));
                                    this.props.dispatch(showAddingMenu());
                                    //create state property with an array of full days
                                }}>
                                Add to list
                                </div>}

                                {/*
                                    {this.checkIfActivityAlreadyAdded(r) &&
                                    <div className="deleteButton">
                                    Delete
                                    </div>}
                                    */}


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
        selectedActivity: state.selectedActivity,
        showAddButton: state.showAddButton,
        showAddingWarningButton: state.showAddingWarningButton,
        showDeleteButton: state.showDeleteButton,
        userActivities: state.userActivities
    };
}



export default connect(mapStateToProps)(CategoryResults);
