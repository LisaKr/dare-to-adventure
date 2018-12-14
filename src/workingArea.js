import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';


import {
    changeBackground,
    getCategoryResults,
    putCityInState,
    hideCategoryResults,
    setCategoryToState,
    getVenueDetails,
    hideVenue
} from "./actions.js";



class WorkingArea extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        //here we will make a response to the database seeing what is the city the user with the current req.session.id
        //worked on. we will take and lowercase this name and send it back here
        //one request to get the city

        if (!this.props.backgroundUrl) {
            let resp = await axios.get("/current-city");
            let city = resp.data.replace(/\s+/g, '+');

            this.props.dispatch(changeBackground(city));
            this.props.dispatch(putCityInState(city));

        }


        console.log("wa runs!!!");
    }

    render(){

        return(
            <div className="working-area-container">
                <img src={this.props.backgroundUrl} className="background"/>

                <div className="category-container">

                    <div className="category"
                        onClick={ () => {
                            this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06374d81259", 0));
                            this.props.dispatch(setCategoryToState("4d4b7105d754a06374d81259"));
                        }}>
                        Food
                    </div>

                    <div className="category"
                        onClick={ () => {
                            this.props.dispatch(getCategoryResults(this.props.city, "4d4b7104d754a06370d81259", 0));
                            this.props.dispatch(setCategoryToState("4d4b7104d754a06370d81259"));
                        }}>
                    Culture </div>

                    <div className="category"
                        onClick={ () => {
                            this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06377d81259", 0));
                            this.props.dispatch(setCategoryToState("4d4b7105d754a06377d81259"));
                        }}
                    > Nature </div>

                    <div className="category"
                        onClick={ () => {
                            this.props.dispatch(getCategoryResults(this.props.city, "4d4b7105d754a06376d81259", 0));
                            this.props.dispatch(setCategoryToState("4d4b7105d754a06376d81259"));
                        }}>
                    Nightlife </div>
                </div>

                {this.props.categoryResults &&
                    <div className="category-results-container">
                        <div className="closingButton" onClick={ () => {this.props.dispatch(hideCategoryResults());}}> X </div>

                        {this.props.categoryResults && this.props.categoryResults.map(
                            r => {
                                return (
                                    <div key={r.id} className="result" onClick={ () => {this.props.dispatch(getVenueDetails(r.id));}}>
                                        {r.name}, {r.location}
                                    </div>
                                );
                            }
                        )}
                        {this.props.categoryResults &&
                        <div className="moreButton"
                            onClick={ () => {
                                this.props.dispatch(getCategoryResults(this.props.city, this.props.category, this.props.offset));
                            }}>
                        MORE
                        </div>
                        }

                        {this.props.venueDetails &&
                    <div className="venue-details-container">

                        {this.props.venueDetails && <div className="closingButton" onClick={ () => {this.props.dispatch(hideVenue());}}> X </div>}
                        {this.props.venueDetails && this.props.venueDetails.map(
                            v => {
                                return (
                                    <div key={v.id} className="venue">
                                        {v.name} ({v.category})
                                        <br/>
                                        Price range: {v.price}
                                        <br/>
                                        {v.description}
                                        <br/>
                                        <img src={v.imgurl} className="venue-image"/>
                                        <br/>
                                        <a href={v.url} target="_blank" rel="noopener noreferrer">Website</a>
                                    </div>
                                );
                            }
                        )}
                    </div>}

                    </div>}

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        backgroundUrl: state.backgroundUrl,
        numOfDays: state.numOfDays,
        categoryResults: state.categoryResults,
        city: state.city,
        category: state.category,
        offset: state.offset,
        venueDetails: state.venueDetails
    };
}



export default connect(mapStateToProps)(WorkingArea);
