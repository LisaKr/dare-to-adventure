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
    hideVenue,
    getWeather
} from "./actions.js";



class WorkingArea extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        //here we will make a response to the database seeing what is the city the user with the current req.session.id
        //worked on. we will take and lowercase this name and send it back here
        //one request to get the city

        //if we're not coming from the setup already we need to get info somewhere else
        if (!this.props.city) {
            let resp = await axios.get("/current-city");
            let city = resp.data.replace(/\s+/g, '+');

            this.props.dispatch(putCityInState(city));
            this.props.dispatch(changeBackground(city));
            this.props.dispatch(getWeather(city));
        }

        console.log("wa runs!");
    }







    render(){
        return(
            <div className="working-area-container">
                <img src={this.props.backgroundUrl} className="background"/>

                {/* //////////////THIS IS SHOWING FOUR CATEGORIES AND HANDLING CLICKS ON THEM TO SHOW RESPECTIVE RESULTS//////////////////*/}

                <div className="category-container">

                    <div className="category"
                        onClick={ () => {
                            {/*WE ARE GETTING FIRST SET OF RESULTS AND SETTING THE CATEGORY IN STATE FOR THE "MORE" BUTTON*/}
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


                {/*WHEN THE RESULTS HAVE COME BACK FROM THE API I AM DISPLAYING THEM*/}
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

                        <div className="moreButton"
                            onClick={ () => {
                                this.props.dispatch(getCategoryResults(this.props.city, this.props.category, this.props.offset));
                            }}>
                        MORE
                        </div>
                        {/*END OF DISPLAYING RESULT LIST*/}

                        {/*WHEN WE CLICK ON A SPECIFIC VENUE WE DISPLAY A MODAL DESCRIBIG IT*/}
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
                        {/*END OF DISPLAYING VENUE DETAILS*/}


                    </div>}

                {/*DISPLAYING WEATHER*/}
                <div className="weather-container">
                    {(this.props.weather && this.props.city) && this.props.weather.map(
                        w => {
                            return (
                                <div key={w.temperature} className="weather">
                                Current weather in {this.props.city} <br/>
                                    {w.temperature}° Celcius
                                    <br/>
                                    <img src={w.iconurl}/>
                                </div>
                            );
                        }
                    )}
                </div>


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
        venueDetails: state.venueDetails,
        weather: state.weather
    };
}



export default connect(mapStateToProps)(WorkingArea);
