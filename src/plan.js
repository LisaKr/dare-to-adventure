import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import {
    putActivitiesInState,
    putCityInState,
    checkingActivitiesInDays,
    setDays,
    createArrayOfDaysInState,
    hideAddButton,
    changeBackground,
    getWeather,
    showAddButtonAtFirst,
    deleteActivity,
    setDeletablePropertyToFalse} from "./actions.js";


class Plan extends React.Component {
    constructor() {
        super();

        this.deleteActivity = this.deleteActivity.bind(this);
    }

    async deleteActivity(activityName) {
        //on press on delete i delete activity in the db and then get activities again to set into state,
        //this time without this activity
        await axios.get("/delete/" + activityName);

        console.log("this.props.city", this.props.city);

        // let city = this.props.city.replace(/\s/g, '+');

        // console.log("ciry", city);

        let resp = await axios.get("/get-activities/" + this.props.city);
        console.log("new list of activities", resp.data);
        this.props.dispatch(putActivitiesInState(resp.data));

        console.log("numOfDays", this.props.numOfDays);

        //then also after deleting I want to check whether any day has become available
        for (let i = 1; i<this.props.numOfDays; i++) {
            console.log("checking the loop", i);
            await this.props.dispatch(checkingActivitiesInDays(i));
        }

        this.props.dispatch(showAddButtonAtFirst());
    }


    render() {

        // on reload putting city and activities in state
        // only on reload
        if (!this.props.city) {
            let arrOfDays = [];

            axios.get("/current-city").then((resp) => {

                let city = resp.data.replace(/\+/g, " ");

                this.props.dispatch(putCityInState(city));
                this.props.dispatch(changeBackground(city));
                this.props.dispatch(getWeather(city));


                axios.get("/get-activities/" + resp.data).then( (response) => {
                    this.props.dispatch(putActivitiesInState(response.data));
                });
            }).catch(err => console.log("error in plan render", err));

            axios.get("/numofdays").then((resp) => {
                this.props.dispatch(setDays(resp.data));

                for (let i = 0; i<resp.data; i++) {
                    arrOfDays.push(i+1);
                }
                //to put the whole array into the state
                this.props.dispatch(createArrayOfDaysInState(arrOfDays));

                //adjusting the arrofdays is important because of the possibility of going back to main and
                //arr of days will be taken there as state
                for (let i = 1; i<arrOfDays.length+1; i++) {
                    // console.log("checking the loop", i);
                    this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
                        if (this.props.arrOfDays == []) {
                            this.props.dispatch(hideAddButton());
                        } else {
                            this.props.dispatch(showAddButtonAtFirst());
                        }
                    });
                }
            });

        }



        return(
            <div className="plan-container">
                <h1> this is your plan for your travel to {this.props.city}</h1>
                {this.props.userActivities && this.props.userActivities.map(
                    a => {
                        return (
                            <div key={a.activityname} className="user-activities">
                                <span className="plan-day">day {a.day} </span> || <span className="plan-category"> {a.category} </span> || <span className="plan-activity"> {a.activityname} || {a.activitylocation} </span>
                                <br/>
                                <div className="deleteButton" onClick={ async () => {
                                    await this.props.dispatch(deleteActivity(a.activityname));

                                    for (let i = 1; i<this.props.numOfDays; i++) {
                                        console.log("checking the loop", i);
                                        await this.props.dispatch(checkingActivitiesInDays(i));
                                    }

                                    await this.props.dispatch(showAddButtonAtFirst());

                                    // for (let i =0; i<this.props.categoryResults.length; i++) {
                                    //     if (this.props.categoryResults[i].name == a.activityname) {
                                    //         // console.log("hoorah!!!", this.props.categoryResults[i].name, r.name);
                                    //         this.props.dispatch(showAddButtonAtFirst());
                                    //         this.props.dispatch(setDeletablePropertyToFalse(this.props.categoryResults[i].name));
                                    //     }
                                    // }
                                }}> DELETE </div>
                                <br/><br/>
                            </div>
                        );
                    }
                )}

                <Link to="/working-area"> Back to main </Link>
            </div>
        );
    }

}




function mapStateToProps(state) {

    return {
        city: state.city,
        userActivities: state.userActivities,
        numOfDays: state.numOfDays,
        categoryResults: state.categoryResults
    };
}



export default connect(mapStateToProps)(Plan);
