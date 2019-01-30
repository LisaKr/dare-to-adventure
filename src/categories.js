//showing the four main categories and handling clicks on them

import React from "react";
import { connect } from "react-redux";

import { showSubCategories, hideDinnerOptions, setDistanceToState } from "./actions.js";

import SubCategories from "./subCategories";

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.getClass = this.getClass.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }


    handleCategoryClick(category) {
        //rememebering the selected category or setting it to null if you click on it the second time just to close it
        if (this.state.currentCategory == category) {
            this.setState({
                currentCategory: null
            });
        } else {
            this.setState({
                currentCategory: category
            });
        }
        //toggling the selected property
        // if (this.state.selected) {
        //     this.setState({
        //         selected: false
        //     }, () => {console.log(this.state);});
        // } else {
        //     this.setState({
        //         selected: true
        //     }, () => {console.log(this.state);});
        // }
    }

    getClass(category) {
        if (this.state.currentCategory == null) {
            return "category black";
        }
        //if the category for which the class is evaluated is not the currently clicked and the selected toggle is on true, it's white
        //&& this.state.selected
        if(this.state.currentCategory != category ) {
            return "category white";
        }
        else {
            return "category black";
        }
    }


    render() {
        return (
            <div className="categories-container">
                <div className="category-container">
                    <div className={this.getClass("FOOD")}
                        onClick={ () => {
                            {/*we need category for the later db inserton of the selected activity and for the handling of the "more" button*/}
                            //if we click on food for the second time when it's already selected
                            if (this.props.subcategoryToShow == "FOOD") {
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(showSubCategories(null));
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("FOOD");
                            //if we click on food and it is not selected yet
                            } else {
                                this.handleCategoryClick("FOOD");
                                this.props.dispatch(showSubCategories("FOOD"));
                            }
                        }}>
                        <img className="icon" src="/burger.png"/>
                    </div>
                    {this.props.subcategoryToShow == "FOOD" && <SubCategories/>}
                </div>
                <div className="category-container">
                    <div className={this.getClass("CULTURE")}
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "CULTURE") {
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(showSubCategories(null));
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("CULTURE");
                            } else {
                                this.handleCategoryClick("CULTURE");
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(showSubCategories("CULTURE"));
                            }
                        }}>
                        <img className="icon" src="/culture.png"/>
                    </div>
                    {this.props.subcategoryToShow == "CULTURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className={this.getClass("NATURE")}
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "NATURE") {
                                this.props.dispatch(showSubCategories(null));
                                this.props.dispatch(setDistanceToState(null));
                                this.handleCategoryClick("NATURE");
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.handleCategoryClick("NATURE");
                                this.props.dispatch(showSubCategories("NATURE"));
                            }
                        }}
                    > <img className="icon" src="/nature.png"/>
                    </div>
                    {this.props.subcategoryToShow == "NATURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className={this.getClass("NIGHTLIFE")}
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "NIGHTLIFE") {
                                this.props.dispatch(showSubCategories(null));
                                this.handleCategoryClick("NIGHTLIFE");
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.handleCategoryClick("NIGHTLIFE");
                                this.props.dispatch(showSubCategories("NIGHTLIFE"));
                            }
                        }}>
                        <img className="icon" src="/nightlife.png"/>
                    </div>
                    {this.props.subcategoryToShow == "NIGHTLIFE" && <SubCategories/>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        subcategoryToShow: state.subcategoryToShow,
        dinnerShown: state.dinnerShown
    };
}

export default connect(mapStateToProps)(Categories);
