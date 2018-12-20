import React from "react";
import { connect } from "react-redux";

import { getCategoryResults, setCategoryToState } from "./actions.js";

class Categories extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="category-container">

                <div className="category"
                    onClick={ () => {
                        {/*WE ARE GETTING FIRST SET OF RESULTS AND SETTING THE CATEGORY IN STATE FOR THE "MORE" BUTTON*/}
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06374d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06374d81259"));
                    }}>
                    <img className="icon" src="/burger.png"/>
                </div>

                <div className="category"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7104d754a06370d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7104d754a06370d81259"));
                    }}>
                    <img className="icon" src="/culture.png"/>
                </div>

                <div className="category"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06377d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06377d81259"));
                    }}
                > <img className="icon" src="/nature.png"/> </div>

                <div className="category"
                    onClick={ () => {
                        this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06376d81259", 0));
                        this.props.dispatch(setCategoryToState("4d4b7105d754a06376d81259"));
                    }}>
                    <img className="icon" src="/nightlife.png"/> </div>
            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        city: state.city
    };
}



export default connect(mapStateToProps)(Categories);
