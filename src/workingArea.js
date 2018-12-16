import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';


import {
    changeBackground,
    putCityInState,
    getWeather,
    setDays
} from "./actions.js";


import Categories from "./categories";
import CategoryResults from "./categoryResults";
import VenueDetails from "./venueDetails";
import Weather from "./weather";
import Logout from "./logout";





class WorkingArea extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        //here we will make a response to the database seeing what is the city the user with the current req.session.id
        //worked on. we will take and lowercase this name and send it back here
        //one request to get the city

        //if we're not coming from the setup already we need to get info somewhere else
        // if (!this.props.city) {
        //     let resp = await axios.get("/current-city");
        //     let city = resp.data.replace(/\s+/g, '+');
        //
        //     this.props.dispatch(putCityInState(city));
        //     this.props.dispatch(changeBackground(city));
        //     this.props.dispatch(getWeather(city));
        // }

        console.log("wa runs!");
    }



    render(){
        //if the user isnt coming from the setup page where it is set before redirection then it needs to be gotten again
        //(happens on log in)
        if (!this.props.city) {
            axios.get("/current-city").then((resp) => {
                console.log("data", resp.data);
                let city = resp.data.replace(/\s+/g, '+');
                this.props.dispatch(putCityInState(city));
                this.props.dispatch(changeBackground(city));
                this.props.dispatch(getWeather(city));
            }).catch(err=>{console.log("error in getting current city on the front", err);});

            axios.get("/numofdays").then((resp) => {
                console.log("num of days", resp.data);
                this.props.dispatch(setDays(resp.data));
            }).catch(err=>{console.log("error in getting current days on the front", err);});
        }

        return(
            <div className="working-area-container">


                <img src={this.props.backgroundUrl} className="background"/>

                {/*DISPLAYING FOUR CATEGORIES TO CHOOSE FROM*/}
                <Categories/>

                {/*WHEN THE RESULTS HAVE COME BACK FROM THE API I AM DISPLAYING THEM*/}
                {this.props.categoryResults && <CategoryResults/>}

                {/*WHEN WE CLICK ON A SPECIFIC VENUE WE DISPLAY A MODAL DESCRIBIG IT*/}
                {this.props.venueDetails && <VenueDetails/>}

                {/*DISPLAYING WEATHER*/}
                <Weather/>

                <Logout/>

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
