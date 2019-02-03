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
    groupActivitiesForPlanPage,
    showSubCategories,
    hideDinnerOptions
} from "./actions.js";

import AddingMenu from "./AddingMenu";

class CategoryResults extends React.Component {
    constructor() {
        super();
    }


    render() {
        return(
            <div className="category-results-container">
                <div className="closingButton" onClick={ () => {
                    this.props.dispatch(hideCategoryResults());
                    // this.props.dispatch(hideDinnerOptions());
                    // this.props.dispatch(showSubCategories(null));
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
                    {/*first attempt to hide more button if there are no more results --> if the amount of
                    results at any run is less then 10,20,30 etc, don't show the button. also don't show if there are no results at all.
                    so far it will show it if there exactly 10,20,30 etc but no more*/}
                    {(this.props.categoryResults.length % 10 == 0 && this.props.categoryResults.length!= 0) &&
                        <div className="moreButton"
                            onClick={ () => {
                                let lat, lng, distance;
                                if (this.props.coord) {
                                    lat = this.props.coord.lat;
                                    lng = this.props.coord.lng;
                                } else {
                                    lat = undefined;
                                    lng = undefined;
                                }
                                //if there are no coordinates we take a default radius of 15km
                                if (this.props.distance) {
                                    distance = this.props.distance;
                                } else {
                                    distance = "15000";
                                }
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, this.props.category, this.props.offset, this.props.option, distance));
                            }}>
                            <button>MORE</button>
                        </div>}

                    {this.props.categoryResults.length == 0 &&
                        <p> Sorry, there seems to be nothing here! Consider expanding your search radius.</p>}
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
        option: state.option,
        coord: state.coord,
        distance: state.distance
    };
}

export default connect(mapStateToProps)(CategoryResults);
