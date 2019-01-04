//showing the four main categories and handling clicks on them

import React from "react";
import { connect } from "react-redux";

import { getCategoryResults, setCategoryToState, showFoodSubCategories } from "./actions.js";

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

    changeBackground() {
        let categories = document.querySelectorAll(".category");
        categories.forEach(cat => {
            cat.classList.remove("black");
            cat.classList.add("white");
        });
        document.querySelectorAll(".category")[0].classList.remove("white");
        document.querySelectorAll(".category")[0].classList.add("black");
    }

    render() {
        // var catClass = this.getClass();

        return (
            <div className="category-container">
                <div className="category black"
                    onClick={ () => {
                        {/*WE ARE GETTING FIRST SET OF RESULTS AND SETTING THE CATEGORY IN STATE FOR THE "MORE" BUTTON*/}
                        {/*this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06374d81259", 0));*/}
                        {/*we need category for the later db inserton of the selected activity and for the handling of the "more" button*/}
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06374d81259"));
                        this.props.dispatch(showFoodSubCategories("FOOD"));
                        // this.changeBackgroundOfOthers();
                        // this.changeBackgroundOfCurrent();
                        this.changeBackground();
                    }}>
                    <img className="icon" src="/burger.png"/>
                </div>

                <div className="category black"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7104d754a06370d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7104d754a06370d81259"));
                    }}>
                    <img className="icon" src="/culture.png"/>
                </div>

                <div className="category black"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06377d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06377d81259"));
                    }}
                > <img className="icon" src="/nature.png"/> </div>

                <div className="category black"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06376d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06376d81259"));
                    }}>
                    <img className="icon" src="/nightlife.png"/> </div>
                <break></break>
                {this.props.subcategoryToShow && <SubCategories/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        subcategoryToShow: state.subcategoryToShow
    };
}

export default connect(mapStateToProps)(Categories);
