import React from "react";
import { connect } from "react-redux";

import { getCategoryResults, setCategoryToState, setOptionToState } from "./actions.js";


class subCategories extends React.Component {
    constructor() {
        super();
        this.state = {showDinner: false};
        this.showDinnerOptions = this.showDinnerOptions.bind(this);
        this.hideDinnerOptions = this.hideDinnerOptions.bind(this);
    }

    showDinnerOptions() {
        this.setState({
            showDinner: true
        });
    }

    hideDinnerOptions() {
        this.setState({
            showDinner: false
        });
    }

    changeBackground(i) {
        let categories = document.querySelectorAll(".subcategory");
        categories.forEach(cat => {
            cat.classList.remove("black");
            cat.classList.add("white");
        });
        document.querySelectorAll(".subcategory")[i].classList.remove("white");
        document.querySelectorAll(".subcategory")[i].classList.add("black");
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
            <div className="subcategories-container">
                {this.props.subcategoryToShow=="FOOD" &&
                <div className="subcategories-food">
                    <div className="subcategory black"
                        onClick={ (e) => {
                            e.preventDefault();
                            this.changeBackground(0);
                            this.hideDinnerOptions();
                            this.props.dispatch(setCategoryToState("breakfast"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "breakfast", 0, "recEndpoint"));
                        }}>
                    Breakfast
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.hideDinnerOptions();
                            this.props.dispatch(setCategoryToState("lunch"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "lunch", 0, "recEndpoint"));
                        }}>
                    Lunch
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            if (this.state.showDinner == false) {
                                this.changeBackground(2);
                                this.showDinnerOptions();
                            } else {
                                this.hideDinnerOptions();
                                this.changeBackgroundBackToBlack();
                            }

                        }}>
                    Dinner
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.hideDinnerOptions();
                            this.props.dispatch(setCategoryToState("coffee"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "coffee", 0, "recEndpoint"));
                        }}>
                    Coffee & Cake
                    </div>
                </div>
                }
                {this.state.showDinner &&
                <div className="dinner-options-container">
                    <div className="dinner-subcat"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d110941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d110941735", 0, "exploreEndpoint"));
                        }}>
                    Italian
                    </div>

                    <div className="dinner-subcat"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d142941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d142941735", 0, "exploreEndpoint"));
                        }}>
                    Asian
                    </div>

                    <div className="dinner-subcat"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d10d941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d10d941735", 0, "exploreEndpoint"));
                        }} >
                    German
                    </div>

                    <div className="dinner-subcat"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d16c941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d16c941735", 0, "exploreEndpoint"));
                        }}>
                    Burgers
                    </div>

                    <div className="dinner-subcat"
                        onClick={ () => {
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1c1941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d1c1941735", 0, "exploreEndpoint"));
                        }}>
                    Mexican
                    </div>
                </div>}

                {this.props.subcategoryToShow=="CULTURE" &&
                <div className="subcategories-culture">
                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(0);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d181941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d181941735", 0, "exploreEndpoint"));
                        }}>
                        Museum
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1e2931735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d1e2931735", 0, "exploreEndpoint"));
                        }}>
                        Gallery
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(2);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d137941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d137941735", 0, "exploreEndpoint"));
                        }}>
                        Theater
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d17f941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d17f941735", 0, "exploreEndpoint"));
                        }}>
                        Cinema
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(4);
                            this.props.dispatch(setCategoryToState("5032792091d4c4b30a586d5c"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "5032792091d4c4b30a586d5c", 0, "exploreEndpoint"));
                        }}>
                        Music
                    </div>
                </div>}

                {this.props.subcategoryToShow=="NATURE" &&
                <div className="subcategories-nature">
                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(0);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1e2941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d1e2941735", 0, "exploreEndpoint"));
                        }}>
                    Beach
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d163941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d163941735", 0, "exploreEndpoint"));
                        }}>
                    Park
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(2);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d161941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d161941735", 0, "exploreEndpoint"));
                        }}>
                    Lake
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d159941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d159941735", 0, "exploreEndpoint"));
                        }}>
                    Hiking
                    </div>
                </div>
                }

                {this.props.subcategoryToShow=="NIGHTLIFE" &&
                <div className="subcategories-nightlife">
                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(0);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d11b941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d11b941735", 0, "exploreEndpoint"));
                        }}>
                        Pub
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d11e941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d11e941735", 0, "exploreEndpoint"));
                        }}>
                        Cocktail Bar
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(2);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1d8941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d1d8941735", 0, "exploreEndpoint"));
                        }}>
                        Queer Bar
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d11f941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d11f941735", 0, "exploreEndpoint"));
                        }}>
                        Clubbing
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(4);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d123941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(this.props.city, "4bf58dd8d48988d123941735", 0, "exploreEndpoint"));
                        }}>
                        Wine bar
                    </div>
                </div>}
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

// document.addEventListener('click', function () {
//     console.log("document click runs");
//     document.querySelector(".dinner-options-container").style.display = 'none';
//     document.querySelector(".subcategories-container").style.display = 'none';
// });
