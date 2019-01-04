import React from "react";
import { connect } from "react-redux";

import { getCategoryResults, setCategoryToState } from "./actions.js";


class subCategories extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log("subcategories mounted!!!");
    }

    render() {
        return(
            <div className="subcategories-container">
                {this.props.subcategoryToShow=="FOOD" &&
                <div className="subcategories-food">
                    <div className="subcategory"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d110941735"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d110941735", 0));
                        }}>
                    Italian
                    </div>

                    <div className="subcategory"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d142941735"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d142941735", 0));
                        }}>
                    Asian
                    </div>

                    <div className="subcategory"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1e0931735"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d1e0931735", 0));
                        }}>
                    Coffee & Cake
                    </div>

                    <div className="subcategory"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4d4b7105d754a06374d81259"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06374d81259", 0));
                        }}>
                    Show all
                    </div>
                </div>
                }
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

export default connect(mapStateToProps)(subCategories);
