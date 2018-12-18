import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import {
    changeBackground,
    putCityInState,
    getWeather,
    setDays,
    createArrayOfDaysInState,
    checkingActivitiesInDays,
    hideAddButton,
    showAddButtonAtFirst,
    userDidSomeWork,
    putActivitiesInState
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

            this.props.dispatch(showAddButtonAtFirst());

            axios.get("/current-city").then((resp) => {
                console.log("data", resp.data);
                let city = resp.data.replace(/\+/g, " ");
                //.replace(/ /g, '+')
                this.props.dispatch(putCityInState(city));
                this.props.dispatch(changeBackground(city));
                this.props.dispatch(getWeather(city));

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
                        this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
                            if (this.props.arrOfDays == []) {
                                this.props.dispatch(hideAddButton());
                            }
                        });
                    }

                    //to pull all activities the user has for this city
                    axios.get("/get-activities/" + city).then( (response) => {
                        // console.log("response for all users activities", response.data);
                        this.props.dispatch(putActivitiesInState(response.data));
                    });


                });



            }).catch(err=>{console.log("error in getting current city on the front", err);});

            // axios.get("/numofdays").then((resp) => {
            //     // console.log("num of days", resp.data);
            //     //for inserting into database
            //     this.props.dispatch(setDays(resp.data));
            //
            //     for (let i = 0; i<resp.data; i++) {
            //         arrOfDays.push(i+1);
            //     }
            //     //to put the whole array into the state
            //     this.props.dispatch(createArrayOfDaysInState(arrOfDays));
            //
            //     //do the checking for full days before re-setting the arrOfDays
            //     //for each day in the array I start the checking query
            //     for (let i = 1; i<arrOfDays.length+1; i++) {
            //         // console.log("checking the loop", i);
            //         this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
            //             if (this.props.arrOfDays == []) {
            //                 this.props.dispatch(hideAddButton());
            //             }
            //         });
            //     }
            // }).catch(err=>{console.log("error in getting current days on the front", err);});

            //to know whether or not to show "view/edit your plan"
            axios.get("/check-user-history").then( (resp) => {
                if (resp.data != "") {
                    this.props.dispatch(userDidSomeWork());
                }
            });




        }

        return(
            <div className="working-area-container">


                <img src={this.props.backgroundUrl} className="background"/>

                {this.props.showAddingWarningButton &&
                <div className="addingWarningButton">
                Your iternary is full! You can add 5 activities per day. Consider deleting something from your plan if you want to add something else.
                </div>}

                {/*DISPLAYING FOUR CATEGORIES TO CHOOSE FROM*/}
                <Categories/>

                {/*WHEN THE RESULTS HAVE COME BACK FROM THE API I AM DISPLAYING THEM*/}
                {this.props.categoryResults && <CategoryResults/>}

                {/*WHEN WE CLICK ON A SPECIFIC VENUE WE DISPLAY A MODAL DESCRIBIG IT*/}
                {this.props.venueDetails && <VenueDetails/>}

                {/*AFTER WE SUCCESSFULLY ADD AN ACTIVITY WE DISPLAY A SUCCESS POP-UP*/}
                {this.props.addedActivity && <AddedActivity/>}

                {/*IF THERE IS ANYTHING IN TH DATABASE FOR THIS USER ALREADY*/}
                {(this.props.userDidSomeWork || this.props.userActivities) &&
                <div className="plan-message">
                    <Link to="/plan"> View/edit your travel plan! </Link>
                </div>}


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
        arrOfDays: state.arrOfDays,
        showAddingWarningButton: state.showAddingWarningButton,
        userDidSomeWork: state.userDidSomeWork,
        userActivities: state.userActivities
    };
}



export default connect(mapStateToProps)(WorkingArea);
