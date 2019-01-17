//the conponent the user sees after selecting all options or after logging in and previosuly having worked on some plans

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
    putActivitiesInState,
    groupActivitiesForPlanPage,
    putCoordinatesIntoState
} from "./actions.js";


import Categories from "./categories";
import CategoryResults from "./categoryResults";
import VenueDetails from "./venueDetails";
import Weather from "./weather";
import AddedActivity from "./addedActivity";
import Logout from "./logout";
import Footer from "./footer";



class WorkingArea extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        console.log("wa mounted");
        let arrOfDays = [];

        this.props.dispatch(showAddButtonAtFirst());

        //only in case the user is reloading the page right after setup and before choosing any activities
        //in this case the user is redirected back to setup
        let userDidSomeWork = await axios.get("/check-user-history");
        if (userDidSomeWork.data == "" && !this.props.city) {
            this.props.history.push('/setup');
        }

        //if the user has done some work, we are loading the selected options
        let coord = await axios.get("/current-coord");
        // console.log("coord on loading of wa: ", coord.data);
        this.props.dispatch(putCoordinatesIntoState(coord.data));

        let resp = await axios.get("/current-city");
        let city = resp.data.replace(/\+/g, " ");

        let promise1 = this.props.dispatch(putCityInState(city));
        let promise2 = this.props.dispatch(changeBackground(resp.data));
        let promise3 = this.props.dispatch(getWeather(city));
        let promise4 = this.props.dispatch(putActivitiesInState(city));
        Promise.all([promise1, promise2, promise3, promise4]).then(()=>{
            this.props.dispatch(groupActivitiesForPlanPage());
        }).catch(err => {console.log(err);});

        let response = await axios.get("/numofdays");
        this.props.dispatch(setDays(response.data));

        for (let i = 0; i<response.data; i++) {
            arrOfDays.push(i+1);
        }
        //to put the whole array into the state
        this.props.dispatch(createArrayOfDaysInState(arrOfDays));

        //do the checking for full days before re-setting the arrOfDays
        for (let i = 1; i<arrOfDays.length+1; i++) {
            this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
                if (this.props.arrOfDays == []) {
                    this.props.dispatch(hideAddButton());
                }
            });
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
        coord: state.coord
    };
}

export default connect(mapStateToProps)(WorkingArea);
