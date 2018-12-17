import React from "react";
import { connect } from "react-redux";

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
    }


    render() {

        return(
            <div className="category-results-container">

                <div className="closingButton" onClick={ () => {this.props.dispatch(hideCategoryResults());}}> X </div>

                {this.props.categoryResults && this.props.categoryResults.map(
                    r => {

                        //based on this check I will either show add or remove button
                        // this.props.dispatch(checkIfActivityAlreadyAdded(r.name, r.location, this.props.city));

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

                                {this.props.showDeleteButton &&
                                <div className="deleteButton">
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
        selectedActivity: state.selectedActivity,
        showAddButton: state.showAddButton,
        showAddingWarningButton: state.showAddingWarningButton,
        showDeleteButton: state.showDeleteButton
    };
}



export default connect(mapStateToProps)(CategoryResults);
