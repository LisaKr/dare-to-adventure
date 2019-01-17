//showing the four main categories and handling clicks on them

import React from "react";
import { connect } from "react-redux";

import { showFoodSubCategories, hideDinnerOptions, setDistanceToState } from "./actions.js";

import SubCategories from "./subCategories";

class Categories extends React.Component {
    constructor() {
        super();
        // this.state = {blackBackground: true, changed: false};
        // this.changeBackgroundOfOthers = this.changeBackgroundOfOthers.bind(this);
        // this.changeBackgroundOfCurrent = this.changeBackgroundOfCurrent.bind(this);
        // this.getClass = this.getClass.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
    }

    // changeBackgroundOfOthers() {
    //     this.setState({
    //         blackBackground: false
    //     });
    // }
    //
    // changeBackgroundOfCurrent() {
    //     let currentCat = document.querySelectorAll(".category")[0];
    //     currentCat.classList.remove('white');
    //     console.log(currentCat);
    //     currentCat.classList.add('black');
    //     this.setState({
    //         changed: true
    //     });
    // }
    //
    // getClass() {
    //     if(this.state.blackBackground === true)
    //         return "category black";
    //     else
    //         return "category white";
    // }

    changeBackground(i) {
        let categories = document.querySelectorAll(".category");
        categories.forEach(cat => {
            cat.classList.remove("black");
            cat.classList.add("white");
        });
        document.querySelectorAll(".category")[i].classList.remove("white");
        document.querySelectorAll(".category")[i].classList.add("black");
    }

    changeBackgroundBackToBlack() {
        let categories = document.querySelectorAll(".category");
        categories.forEach(cat => {
            cat.classList.remove("white");
            cat.classList.add("black");
        });
    }

    render() {
        // var catClass = this.getClass();

        return (
            <div className="categories-container">
                <div className="category-container">
                    <div className="category black"
                        onClick={ (e) => {
                            e.preventDefault();
                            {/*we need category for the later db inserton of the selected activity and for the handling of the "more" button*/}
                            // this.props.dispatch(setCategoryToState("4d4b7105d754a06374d81259"));
                            if (this.props.subcategoryToShow == "FOOD") {
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(showFoodSubCategories(null));
                                this.changeBackgroundBackToBlack();
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.changeBackground(0);
                                this.props.dispatch(showFoodSubCategories("FOOD"));
                            }

                        // this.changeBackgroundOfOthers();
                        // this.changeBackgroundOfCurrent();
                        }}>
                        <img className="icon" src="/burger.png"/>
                    </div>
                    {this.props.subcategoryToShow == "FOOD" && <SubCategories/>}
                </div>
                <div className="category-container">
                    <div className="category black"
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "CULTURE") {
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(showFoodSubCategories(null));
                                this.changeBackgroundBackToBlack();
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.changeBackground(1);
                                this.props.dispatch(showFoodSubCategories("CULTURE"));
                            }
                        }}>
                        <img className="icon" src="/culture.png"/>
                    </div>
                    {this.props.subcategoryToShow == "CULTURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className="category black"
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "NATURE") {
                                this.props.dispatch(showFoodSubCategories(null));
                                this.changeBackgroundBackToBlack();
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.changeBackground(2);
                                this.props.dispatch(showFoodSubCategories("NATURE"));
                            }
                        }}
                    > <img className="icon" src="/nature.png"/>
                    </div>
                    {this.props.subcategoryToShow == "NATURE" && <SubCategories/>}
                </div>

                <div className="category-container">
                    <div className="category black"
                        onClick={ () => {
                            if (this.props.subcategoryToShow == "NIGHTLIFE") {
                                this.props.dispatch(showFoodSubCategories(null));
                                this.changeBackgroundBackToBlack();
                                this.props.dispatch(setDistanceToState(null));
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.changeBackground(3);
                                this.props.dispatch(showFoodSubCategories("NIGHTLIFE"));
                            }
                        // this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06376d81259", 0));
                        // this.props.dispatch(setCategoryToState("4d4b7105d754a06376d81259"));
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
