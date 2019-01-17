import React from "react";
import { connect } from "react-redux";

import { getCategoryResults, setCategoryToState, setOptionToState, hideDinnerOptions, showDinnerOptions, setDistanceToState } from "./actions.js";

import Distance from "./distance";

class subCategories extends React.Component {
    constructor() {
        super();
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

        return(
            <div className="subcategories-container">
                {this.props.subcategoryToShow=="FOOD" &&
                <div>
                    {(this.props.coord.lat != "null" && this.props.coord.lat != "undefined") && <Distance/>}
                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(0);
                            this.props.dispatch(hideDinnerOptions());
                            this.props.dispatch(setCategoryToState("breakfast"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "breakfast", 0, "recEndpoint", distance));
                        }}>
                    Breakfast
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.props.dispatch(hideDinnerOptions());
                            this.props.dispatch(setCategoryToState("lunch"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "lunch", 0, "recEndpoint", distance));
                        }}>
                    Lunch
                    </div>

                    <div className="subcategory black dinner"
                        onClick={ () => {
                            if (this.props.dinnerShown == false || this.props.dinnerShown == null) {
                                this.changeBackground(2);
                                this.props.dispatch(showDinnerOptions());
                            } else {
                                this.props.dispatch(hideDinnerOptions());
                                this.changeBackgroundBackToBlack();
                            }

                        }}>
                    Dinner
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.props.dispatch(hideDinnerOptions());
                            this.props.dispatch(setCategoryToState("coffee"));
                            this.props.dispatch(setOptionToState("recEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "coffee", 0, "recEndpoint", distance));
                        }}>
                    Coffee & Cake
                    </div>
                </div>
                }

                {this.props.dinnerShown &&
            <div className="dinner-options-container">
                <div className="dinner-subcat"
                    onClick={ () => {
                        this.props.dispatch(setCategoryToState("4bf58dd8d48988d110941735"));
                        this.props.dispatch(setOptionToState("exploreEndpoint"));
                        this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d110941735", 0, "exploreEndpoint", distance));
                    }}>
                Italian
                </div>

                <div className="dinner-subcat"
                    onClick={ () => {
                        this.props.dispatch(setCategoryToState("4bf58dd8d48988d142941735"));
                        this.props.dispatch(setOptionToState("exploreEndpoint"));
                        this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d142941735", 0, "exploreEndpoint", distance));
                    }}>
                Asian
                </div>

                <div className="dinner-subcat"
                    onClick={ () => {
                        this.props.dispatch(setCategoryToState("4bf58dd8d48988d10d941735"));
                        this.props.dispatch(setOptionToState("exploreEndpoint"));
                        this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d10d941735", 0, "exploreEndpoint", distance));
                    }} >
                German
                </div>

                <div className="dinner-subcat"
                    onClick={ () => {
                        this.props.dispatch(setCategoryToState("4bf58dd8d48988d16c941735"));
                        this.props.dispatch(setOptionToState("exploreEndpoint"));
                        this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d16c941735", 0, "exploreEndpoint", distance));
                    }}>
                Burgers
                </div>

                <div className="dinner-subcat"
                    onClick={ () => {
                        this.props.dispatch(setCategoryToState("4bf58dd8d48988d1c1941735"));
                        this.props.dispatch(setOptionToState("exploreEndpoint"));
                        this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d1c1941735", 0, "exploreEndpoint", distance));
                    }}>
                Mexican
                </div>
            </div>}


                {this.props.subcategoryToShow=="CULTURE" &&
                    <div>
                        {(this.props.coord.lat != "null" && this.props.coord.lat != "undefined") && <Distance/>}
                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(0);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d181941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d181941735", 0, "exploreEndpoint", distance));
                            }}>
                        Museum
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(1);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d1e2931735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d1e2931735", 0, "exploreEndpoint", distance));
                            }}>
                        Gallery
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(2);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d137941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d137941735", 0, "exploreEndpoint", distance));
                            }}>
                        Theater
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(3);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d17f941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d17f941735", 0, "exploreEndpoint", distance));
                            }}>
                        Cinema
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(4);
                                this.props.dispatch(setCategoryToState("5032792091d4c4b30a586d5c"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "5032792091d4c4b30a586d5c", 0, "exploreEndpoint", distance));
                            }}>
                        Music
                        </div>
                    </div>}

                {this.props.subcategoryToShow=="NATURE" &&
                <div>
                    {(this.props.coord.lat != "null" && this.props.coord.lat != "undefined") && <Distance/>}
                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(0);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d1e2941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d1e2941735", 0, "exploreEndpoint", distance));
                        }}>
                    Beach
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(1);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d163941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d163941735", 0, "exploreEndpoint", distance));
                        }}>
                    Park
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(2);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d161941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d161941735", 0, "exploreEndpoint", distance));
                        }}>
                    Lake
                    </div>

                    <div className="subcategory black"
                        onClick={ () => {
                            this.changeBackground(3);
                            this.props.dispatch(setCategoryToState("4bf58dd8d48988d159941735"));
                            this.props.dispatch(setOptionToState("exploreEndpoint"));
                            this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d159941735", 0, "exploreEndpoint", distance));
                        }}>
                    Hiking
                    </div>
                </div>
                }

                {this.props.subcategoryToShow=="NIGHTLIFE" &&
                    <div>
                        {(this.props.coord.lat != "null" && this.props.coord.lat != "undefined") && <Distance/>}
                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(0);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d11b941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d11b941735", 0, "exploreEndpoint", distance));
                            }}>
                        Pub
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(1);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d11e941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d11e941735", 0, "exploreEndpoint", distance));
                            }}>
                            Cocktail Bar
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(2);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d1d8941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d1d8941735", 0, "exploreEndpoint", distance));
                            }}>
                        Queer Bar
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(3);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d11f941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d11f941735", 0, "exploreEndpoint", distance));
                            }}>
                        Clubbing
                        </div>

                        <div className="subcategory black"
                            onClick={ () => {
                                this.changeBackground(4);
                                this.props.dispatch(setCategoryToState("4bf58dd8d48988d123941735"));
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(getCategoryResults(lat, lng, this.props.city, "4bf58dd8d48988d123941735", 0, "exploreEndpoint", distance));
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
        subcategoryToShow: state.subcategoryToShow,
        dinnerShown: state.dinnerShown,
        coord: state.coord,
        distance: state.distance
    };
}

export default connect(mapStateToProps)(subCategories);

// document.addEventListener('click', function () {
//     console.log("document click runs");
//     document.querySelector(".dinner-options-container").style.display = 'none';
//     document.querySelector(".subcategories-container").style.display = 'none';
// });
