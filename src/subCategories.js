import React from "react";
import { connect } from "react-redux";

import {
    getCategoryResults,
    setCategoryToState,
    setOptionToState,
    hideDinnerOptions,
    showDinnerOptions,
    setAllBlackToFalse,
    hideSubCategories,
    setDistanceToState
} from "./actions.js";

import Distance from "./distance";

class subCategories extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleSubCategoryClick = this.handleSubCategoryClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //////closing component on click outside
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    async handleClick(e) {
        // so it doesnt close when we close category results (maybe we want to choose another food)
        if (!this.props.categoryResults) {
            //handling click inside
            if (this.node.contains(e.target)) {
                console.log("clicked inside");
                return;
            }
            //handling click outisde
            else {
                //anywhere but on the other categories or dinner categories (those clicks are handled in the categories component)
                if (e.target.id != "FOOD" && e.target.id != "CULTURE" && e.target.id != "NATURE"
                && e.target.id != "NIGHTLIFE" && e.target.id != "ITALIAN"
                && e.target.id != "ASIAN" && e.target.id != "GERMAN"
                && e.target.id != "MEXICAN" && e.target.id != "BURGERS") {
                    console.log("clicked outside");
                    this.props.dispatch(hideDinnerOptions());
                    this.props.dispatch(hideSubCategories());
                    this.props.dispatch(setDistanceToState(null));
                }

            }
        }
    }

    handleSubCategoryClick(subCategory) {
    //if you click double on dinner, not only is cuisine menu hidden, the other subcategories return to black
        if (this.state.currentSubCategory == "dinner" && subCategory == "dinner") {
            this.setState(
                {
                    currentSubCategory: null
                });
        } else {
            this.setState(
                {
                    currentSubCategory: subCategory,
                    currentCuisine: null
                });
        }
    }

    getClass(subCategory) {
    //if initially no subcategory is selected
    //OR allblack is true (after closing the category results) while there is no dinner selection --> otherwise dinner should be the only one selected and the cuisine menu should be all black
    //OR if it is the selected subcategory
        if (
            this.state.currentSubCategory == null ||
      (this.props.allBlack && !this.props.dinnerShown) ||
      this.state.currentSubCategory == subCategory
        ) {
            return "subcategory black";
        }
        //if the category for which the class is evaluated is not the currently clicked it's white
        if (this.state.currentSubCategory != subCategory) {
            return "subcategory white";
        }
    }

    handleDinnerSelection(cuisine) {
        this.setState(
            {
                currentCuisine: cuisine
            });
    }

    getDinnerClass(cuisine) {
        if (
            this.state.currentCuisine == null ||
      this.props.allBlack ||
      this.state.currentCuisine == cuisine
        ) {
            return "dinner-subcat black";
        }
        //if the category for which the class is evaluated is not the currently clicked it's white
        if (this.state.currentCuisine != cuisine) {
            return "dinner-subcat white";
        }
    }

    render() {
        let lat, lng, distance;
        if (this.props.coord != null) {
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

        return (
            <div className="subcategories-container">
                {this.props.subCategoryToShow == "FOOD" && (
                    <div
                        ref={node => {
                            this.node = node;
                        }}
                    >
                        {this.props.coord &&
              this.props.coord.lat != "null" &&
              this.props.coord.lat != "undefined" && <Distance />}
                        {/*on click on subcategory we say that not everything should be black now,
                        put selected category in state, hide dinner and putting options in state to use in an axios
                        request in the more button in another component*/}
                        <div
                            className={this.getClass("breakfast")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("breakfast");
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(setCategoryToState("breakfast"));
                                this.props.dispatch(setOptionToState("recEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "breakfast",
                                        0,
                                        "recEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Breakfast
                        </div>

                        <div
                            className={this.getClass("lunch")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("lunch");
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(setCategoryToState("lunch"));
                                this.props.dispatch(setOptionToState("recEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "lunch",
                                        0,
                                        "recEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Lunch
                        </div>

                        <div
                            className={this.getClass("dinner")}
                            onClick={() => {
                                if (
                                    this.props.dinnerShown == false ||
                  this.props.dinnerShown == null
                                ) {
                                    this.props.dispatch(setAllBlackToFalse());
                                    this.handleSubCategoryClick("dinner");
                                    this.props.dispatch(showDinnerOptions());
                                } else {
                                    this.handleSubCategoryClick("dinner");
                                    this.props.dispatch(hideDinnerOptions());
                                    // this.changeBackgroundBackToBlack();
                                }
                            }}
                        >
              Dinner
                        </div>

                        <div
                            className={this.getClass("coffee")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("coffee");
                                this.props.dispatch(hideDinnerOptions());
                                this.props.dispatch(setCategoryToState("coffee"));
                                this.props.dispatch(setOptionToState("recEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "coffee",
                                        0,
                                        "recEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Coffee & Cake
                        </div>
                    </div>
                )}

                {this.props.dinnerShown && (
                    <div className="dinner-options-container">
                        <div
                            className={this.getDinnerClass("italian")}
                            id="ITALIAN"
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleDinnerSelection("italian");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d110941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d110941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Italian
                        </div>

                        <div
                            className={this.getDinnerClass("asian")}
                            id="ASIAN"
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleDinnerSelection("asian");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d142941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d142941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Asian
                        </div>

                        <div
                            className={this.getDinnerClass("german")}
                            id="GERMAN"
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleDinnerSelection("german");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d10d941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d10d941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              German
                        </div>

                        <div
                            className={this.getDinnerClass("burgers")}
                            id="BURGERS"
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleDinnerSelection("burgers");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d16c941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d16c941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Burgers
                        </div>

                        <div
                            className={this.getDinnerClass("mexican")}
                            id="MEXICAN"
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleDinnerSelection("mexican");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d1c1941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d1c1941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Mexican
                        </div>
                    </div>
                )}

                {this.props.subCategoryToShow == "CULTURE" && (
                    <div ref={node => {
                        this.node = node;
                    }}>
                        {this.props.coord &&
              this.props.coord.lat != "null" &&
              this.props.coord.lat != "undefined" && <Distance />}
                        <div
                            className={this.getClass("museum")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("museum");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d181941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d181941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Museum
                        </div>

                        <div
                            className={this.getClass("gallery")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("gallery");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d1e2931735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d1e2931735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Gallery
                        </div>

                        <div
                            className={this.getClass("theater")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("theater");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d137941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d137941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Theater
                        </div>

                        <div
                            className={this.getClass("cinema")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("cinema");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d17f941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d17f941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Cinema
                        </div>

                        <div
                            className={this.getClass("music")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("music");
                                this.props.dispatch(
                                    setCategoryToState("5032792091d4c4b30a586d5c")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "5032792091d4c4b30a586d5c",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Music
                        </div>
                    </div>
                )}

                {this.props.subCategoryToShow == "NATURE" && (
                    <div ref={node => {
                        this.node = node;
                    }}>
                        {this.props.coord &&
              this.props.coord.lat != "null" &&
              this.props.coord.lat != "undefined" && <Distance />}
                        <div
                            className={this.getClass("beach")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("beach");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d1e2941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d1e2941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Beach
                        </div>

                        <div
                            className={this.getClass("park")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("park");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d163941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d163941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Park
                        </div>

                        <div
                            className={this.getClass("lake")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("lake");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d161941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d161941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Lake
                        </div>

                        <div
                            className={this.getClass("hiking")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("hiking");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d159941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d159941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Hiking
                        </div>
                    </div>
                )}

                {this.props.subCategoryToShow == "NIGHTLIFE" && (
                    <div ref={node => {
                        this.node = node;
                    }}>
                        {this.props.coord &&
              this.props.coord.lat != "null" &&
              this.props.coord.lat != "undefined" && <Distance />}
                        <div
                            className={this.getClass("pub")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("pub");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d11b941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d11b941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Pub
                        </div>

                        <div
                            className={this.getClass("cocktail")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("cocktail");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d11e941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d11e941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Cocktail Bar
                        </div>

                        <div
                            className={this.getClass("queer")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("queer");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d1d8941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d1d8941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Queer Bar
                        </div>

                        <div
                            className={this.getClass("clubbing")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("clubbing");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d11f941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d11f941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Clubbing
                        </div>

                        <div
                            className={this.getClass("wine")}
                            onClick={() => {
                                this.props.dispatch(setAllBlackToFalse());
                                this.handleSubCategoryClick("wine");
                                this.props.dispatch(
                                    setCategoryToState("4bf58dd8d48988d123941735")
                                );
                                this.props.dispatch(setOptionToState("exploreEndpoint"));
                                this.props.dispatch(
                                    getCategoryResults(
                                        lat,
                                        lng,
                                        this.props.city,
                                        "4bf58dd8d48988d123941735",
                                        0,
                                        "exploreEndpoint",
                                        distance
                                    )
                                );
                            }}
                        >
              Wine bar
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        subCategoryToShow: state.subCategoryToShow,
        dinnerShown: state.dinnerShown,
        coord: state.coord,
        distance: state.distance,
        allBlack: state.allBlack,
        categoryResults: state.categoryResults
    };
}

export default connect(mapStateToProps)(subCategories);
