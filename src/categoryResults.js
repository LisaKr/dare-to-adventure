//showing foursquare API results for the respective category, handling clicks on "more", "add" and "delete" buttons

import React from "react";
import { connect } from "react-redux";

import {
    hideCategoryResults,
    getVenueDetails,
    getCategoryResults,
    showAddingMenu,
    setActivityInState,
    checkingActivitiesInDays,
    showAddButtonAtFirst,
    deleteActivity,
    setDeletablePropertyToFalse,
    groupActivitiesForPlanPage
} from "./actions.js";

import AddingMenu from "./AddingMenu";

class CategoryResults extends React.Component {
    constructor() {
        super();
    }

    changeBackgroundBackToBlack() {
        let categories = document.querySelectorAll(".subcategory");
        categories.forEach(cat => {
            cat.classList.remove("white");
            cat.classList.add("black");
        });
    }

    render() {
        return(
            <div className="category-results-container">
                <div className="closingButton" onClick={ () => {
                    this.props.dispatch(hideCategoryResults());
                    this.changeBackgroundBackToBlack();
                }}> X </div>
                <div className="all-results">
                    {this.props.categoryResults && this.props.categoryResults.map(
                        r => {
                            return (
                                //the result div contains name, location and add/delete button
                                <div key={r.id} className="result">
                                    {/*the result info contains only name and location. click on it results in
                                    showing the venue details (another API request with the respective id)*/}
                                    <div className="result-info" onClick={ () => {
                                        this.props.dispatch(getVenueDetails(r.id));
                                    }}>
                                        {r.name} || {r.location}
                                    </div>
                                    {/*when there are still free slots in some days AND the activity isn't added yet*/}
                                    {(this.props.showAddButton && !r.deletable) &&
                                <div className="addButton" onClick={ () => {
                                    this.props.dispatch(setActivityInState(r.name, r.location));
                                    this.props.dispatch(showAddingMenu(r.name, r.location));
                                }}>
                                 Add to list
                                </div>}

                                    {/*if the activity is already added*/}
                                    {r.deletable &&
                                    <div className="deleteButton" onClick = { async () => {
                                        {/*userActivities get updated in state first and the groupedActivities follow*/}
                                        await this.props.dispatch(deleteActivity(r.name));
                                        await this.props.dispatch(groupActivitiesForPlanPage());
                                        {/*check every day in the arrOfDays for freed up spots in order to allow to add activities to that day again*/}
                                        for (let i = 1; i<=this.props.numOfDays; i++) {
                                            await this.props.dispatch(checkingActivitiesInDays(i));
                                        }
                                        {/*showing add button again as at least one spot has been freed*/}
                                        await this.props.dispatch(showAddButtonAtFirst());
                                        {/*change the deletable property of the deleted activity in order to toggle the add/delete button*/}
                                        for (let i =0; i<this.props.categoryResults.length; i++) {
                                            if (this.props.categoryResults[i].name == r.name) {
                                                this.props.dispatch(setDeletablePropertyToFalse(this.props.categoryResults[i].name));
                                            }
                                        }
                                    }}>
                                     Delete
                                    </div>}
                                </div>
                            );
                        }
                    )}

                    <div className="moreButton"
                        onClick={ () => {
                            console.log("more is clicked", this.props.category, this.props.option);
                            this.props.dispatch(getCategoryResults(this.props.city, this.props.category, this.props.offset, this.props.option));
                        }}>
                        <button>MORE</button>
                    </div>
                </div>
                {/*SHOWING THE MENU WITH DAYS WHEN YOU'RE ADDING AN ACTIVITY*/}
                {this.props.showMenu &&  <AddingMenu/>}
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
        userActivities: state.userActivities,
        option: state.option
    };
}

export default connect(mapStateToProps)(CategoryResults);
