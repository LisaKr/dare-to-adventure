//the conponent the user sees after selecting all options or after logging in and previosuly having worked on some plans

import React from "react";
import axios from "./axios";
import { connect } from "react-redux";

import {
    changeBackground,
    putCityInState,
    getWeather,
    setDays,
    createArrayOfDaysInState,
    checkingActivitiesInDays,
    hideAddButton,
    showAddButtonAtFirst,
    putActivitiesInState,
    groupActivitiesForPlanPage,
    putCoordinatesIntoState,
    putAddressIntoState,
    deleteOptionsFromTable
} from "./actions.js";


import Categories from "./categories";
import Loader from "./loader";
import CategoryResults from "./categoryResults";
import VenueDetails from "./venueDetails";
import AddedActivity from "./addedActivity";
import Footer from "./footer";

class WorkingArea extends React.Component {
    async componentDidMount() {
        console.log("wa mounted");

        let arrOfDays = [];
        this.props.dispatch(showAddButtonAtFirst());

        //in case the user is reloading the page right after setup and before choosing any activities
        //or the user deleted all their activities for the city and reload the page, they are
        //redirected to setup and their options are deleted from the options table
        let userDidSomeWork = await axios.get("/check-user-history");

        if (userDidSomeWork.data == "" && !this.props.city) {
            console.log("user did not do any work");
            this.props.dispatch(deleteOptionsFromTable());
            this.props.history.push('/setup');
        } else {
            console.log("beginning of when user did some work");
            //if the user has done some work, we are loading the selected options

            //getting coordinates from the options table and putting them in state
            let coord = await axios.get("/current-coord");
            this.props.dispatch(putCoordinatesIntoState(coord.data));

            //getting address from the options table and putting it in state
            let address = await axios.get("/current-address");
            this.props.dispatch(putAddressIntoState(address.data.address));
            //same with the city
            let resp = await axios.get("/current-city");
            let city = resp.data.replace(/\+/g, " ");
            //waiting on all the putting in state to complete before grouping activities for the plan page
            let promise1 = this.props.dispatch(putCityInState(city));
            let promise2 = this.props.dispatch(changeBackground(resp.data));
            let promise3 = this.props.dispatch(getWeather(city));
            let promise4 = this.props.dispatch(putActivitiesInState(city));
            Promise.all([promise1, promise2, promise3, promise4]).then(()=>{
                this.props.dispatch(groupActivitiesForPlanPage());
            }).catch(err => {console.log(err);});

            //getting current number of days and putting it in state
            let response = await axios.get("/numofdays");
            this.props.dispatch(setDays(response.data));

            for (let i = 0; i<response.data; i++) {
                arrOfDays.push(i+1);
            }
            //to put the whole array into the state
            this.props.dispatch(createArrayOfDaysInState(arrOfDays));

            //do the checking for full days before re-setting the arrOfDays --> to see which days are still available and remove full days
            for (let i = 1; i<arrOfDays.length+1; i++) {
                this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
                    if (this.props.arrOfDays == []) {
                        this.props.dispatch(hideAddButton());
                    }
                });
            }
            console.log("end of wa when user did some work", city, arrOfDays);
        }
    }




    render(){
        return(
            <div className="working-area-container">
                <img src={this.props.backgroundUrl} className="background"/>



                {this.props.showAddingWarningButton &&
                <div className="addingWarningButton">
                Your iternary is full! You can add 5 activities per day. Consider deleting something from your plan if you want to add something else.
                </div>}

                {/*DISPLAYING FOUR CATEGORIES TO CHOOSE FROM*/}
                <Categories/>

                {/*LOADING WHEEL SHOWN WHEN CATEGORY RESULTS ARE LOADING OR WHEN BACKGORUND IMAGE IS NOT YET LOADED*/}
                {((this.props.category && !this.props.categoryResults) || (!this.props.backgroundUrl)) && <Loader/>}

                {/*WHEN THE RESULTS HAVE COME BACK FROM THE API I AM DISPLAYING THEM*/}
                {this.props.categoryResults && <CategoryResults/>}

                {/*WHEN WE CLICK ON A SPECIFIC VENUE WE DISPLAY A MODAL DESCRIBIG IT*/}
                {this.props.venueDetails && <VenueDetails/>}

                {/*AFTER WE SUCCESSFULLY ADD AN ACTIVITY WE DISPLAY A SUCCESS POP-UP*/}
                {this.props.addedActivity && <AddedActivity/>}

                <Footer/>
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
        userActivities: state.userActivities,
        coord: state.coord,
        address: state.address
    };
}

export default connect(mapStateToProps)(WorkingArea);
