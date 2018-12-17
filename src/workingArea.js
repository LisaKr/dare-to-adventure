import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';


import {
    changeBackground,
    putCityInState,
    getWeather,
    setDays,
    createArrayOfDaysInState,
    checkingActivitiesInDays
} from "./actions.js";


import Categories from "./categories";
import CategoryResults from "./categoryResults";
import VenueDetails from "./venueDetails";
import Weather from "./weather";
import AddedActivity from "./addedActivity";
import Logout from "./logout";





class WorkingArea extends React.Component {
    constructor() {
        super();
    }


    render(){
        //if the user isnt coming from the setup page where it is set before redirection then it needs to be gotten again
        //(happens on log in or refresh)
        if (!this.props.city) {
            let arrOfDays = [];

            axios.get("/current-city").then((resp) => {
                // console.log("data", resp.data);
                let city = resp.data.replace(/\s+/g, '+');
                this.props.dispatch(putCityInState(city));
                this.props.dispatch(changeBackground(city));
                this.props.dispatch(getWeather(city));
            }).catch(err=>{console.log("error in getting current city on the front", err);});

            axios.get("/numofdays").then((resp) => {
                // console.log("num of days", resp.data);
                //for inserting into database
                this.props.dispatch(setDays(resp.data));

                for (let i = 0; i<resp.data; i++) {
                    arrOfDays.push(i+1);
                }
                //to put the whole array into the state
                this.props.dispatch(createArrayOfDaysInState(arrOfDays));

                //do the checking for full days before re-setting the arrOfDays
                //for each day in the array I start the checking query
                for (let i = 1; i<arrOfDays.length+1; i++) {
                    // console.log("checking the loop", i);
                    this.props.dispatch(checkingActivitiesInDays(i));
                }

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

                {/*AFTER WE SUCCESSFULLY ADD AN ACTIVITY WE DISPLAY A SUCCESS POP-UP*/}
                {this.props.addedActivity && <AddedActivity/>}

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
        weather: state.weather,
        addedActivity: state.addedActivity,
        arrOfDays: state.arrOfDays
    };
}



export default connect(mapStateToProps)(WorkingArea);
