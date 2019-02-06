//showing the four main categories and handling clicks on them
import React from "react";
import { connect } from "react-redux";

import { showSubCategories, hideDinnerOptions, setDistanceToState, setAllBlackToFalse, hideSubCategories } from "./actions.js";

import SubCategories from "./subCategories";

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.getClass = this.getClass.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    //this function handles hiding and showing subcategories when clicking on the same or other categories
    handleCategoryClick(category) {
        //rememebering the selected category or setting it to null if you click on it the second time just to close it
        if (this.props.subCategoryToShow == category) {
            this.props.dispatch(hideSubCategories());
        } else {
            this.props.dispatch(showSubCategories(category));
        }
    }

    getClass(category) {
        //if you click on the same category twice, then it's null and everything is black
        // OR if you closed list of venues and subcategorytoshow is null
        //OR if the category is the one currently selected
        if (this.props.subCategoryToShow == null || this.props.subCategoryToShow == category) {
            return "category black";
        }
        //if the category for which the class is evaluated is not the currently clicked and the selected toggle is on true, it's white
        if(this.props.subCategoryToShow != category ) {
            return "category white";
        }
    }


    render() {
        return (
            <div className="categories-container">
                <div className="category-container">
                    <div className={this.getClass("FOOD")}
                        onClick={ () => {
                            {/*on a category click we check whether it is the second click and the same category was selected before
                            if it is the case, we set everything to null and black, ultimately closing all selections and restrong status quo
                            hide dinner options is necessary in case we jump from active food+dinner to another category*/}
                            if (this.props.subCategoryToShow === "FOOD") {
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("FOOD");
                                {/*if it is not the case and the category is newly selected, we put the respective subcategory in state*/}
                            } else {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleCategoryClick("FOOD");
                            }
                        }}>
                        <img className="icon" id="FOOD" src="/burger.png"/>
                    </div>
                    {this.props.subCategoryToShow == "FOOD" && <SubCategories/>}
                </div>
                <div className="category-container">
                    <div className={this.getClass("CULTURE")}
                        onClick={ () => {
                            if (this.props.subCategoryToShow == "CULTURE") {
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("CULTURE");
                            } else {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleCategoryClick("CULTURE");
                                this.props.dispatch(hideDinnerOptions());
                            }
                        }}>
                        <img className="icon" id="CULTURE" src="/culture.png"/>
                    </div>
                    {this.props.subCategoryToShow == "CULTURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className={this.getClass("NATURE")}
                        onClick={ () => {
                            if (this.props.subCategoryToShow == "NATURE") {
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("NATURE");
                            } else {
                                this.props.dispatch(setAllBlackToFalse());
                                this.props.dispatch(hideDinnerOptions());
                                this.handleCategoryClick("NATURE");
                            }
                        }}
                    > <img className="icon" id="NATURE" src="/nature.png"/>
                    </div>
                    {this.props.subCategoryToShow == "NATURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className={this.getClass("NIGHTLIFE")}
                        onClick={ () => {
                            if (this.props.subCategoryToShow == "NIGHTLIFE") {
                                this.handleCategoryClick("NIGHTLIFE");
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.props.dispatch(setAllBlackToFalse());
                                this.props.dispatch(hideDinnerOptions());
                                this.handleCategoryClick("NIGHTLIFE");
                            }
                        }}>
                        <img className="icon" id="NIGHTLIFE" src="/nightlife.png"/>
                    </div>
                    {this.props.subCategoryToShow == "NIGHTLIFE" && <SubCategories/>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        subCategoryToShow: state.subCategoryToShow,
        dinnerShown: state.dinnerShown,
        allBlack: state.allBlack
    };
}

export default connect(mapStateToProps)(Categories);
