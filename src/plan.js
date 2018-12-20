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
    groupActivitiesForPlanPage
    // setDeletablePropertyToFalse
} from "./actions.js";


class Plan extends React.Component {
    constructor() {
        super();

        // this.deleteActivity = this.deleteActivity.bind(this);
    }

    componentDidMount() {
        // on reload putting city and activities in state
        // only on reload
        if (!this.props.city) {
            let arrOfDays = [];

            axios.get("/current-city").then((resp) => {
                let city = resp.data.replace(/\+/g, " ");
                let promise1 = this.props.dispatch(putCityInState(city));
                let promise2 = this.props.dispatch(changeBackground(city));
                let promise3 = this.props.dispatch(getWeather(city));
                let promise4 = this.props.dispatch(putActivitiesInState(city));
                console.log("putting activities in state");
                Promise.all([promise1, promise2, promise3, promise4]).then(()=>{
                    this.props.dispatch(groupActivitiesForPlanPage());
                });
            })
                .catch(err => console.log("error in plan render", err));



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
    }

    // async deleteActivity(activityName) {
    //     //on press on delete i delete activity in the db and then get activities again to set into state,
    //     //this time without this activity
    //     await axios.get("/delete/" + activityName);
    //
    //     console.log("this.props.city", this.props.city);
    //
    //     // let city = this.props.city.replace(/\s/g, '+');
    //
    //     // console.log("ciry", city);
    //
    //     let resp = await axios.get("/get-activities/" + this.props.city);
    //     console.log("new list of activities", resp.data);
    //     this.props.dispatch(putActivitiesInState(resp.data));
    //
    //     console.log("numOfDays", this.props.numOfDays);
    //
    //     //then also after deleting I want to check whether any day has become available
    //     for (let i = 1; i<this.props.numOfDays; i++) {
    //         console.log("checking the loop", i);
    //         await this.props.dispatch(checkingActivitiesInDays(i));
    //     }
    //
    //     this.props.dispatch(showAddButtonAtFirst());
    // }


    render() {

        return(
            <div className="plan-container">
                <img src={this.props.backgroundUrl} className="background"/>

                <h1> your trip to {this.props.city}</h1>

                <div className="day-container">
                    {this.props.groupedActivities && Object.keys(this.props.groupedActivities).map(
                        dayAct => {
                            return(
                                <div key={dayAct} className="grouped-day">
                                    <h3>
                                    Day {dayAct}
                                    </h3>{
                                        this.props.groupedActivities[dayAct].map(
                                            activity => {
                                                return (
                                                    <div key={activity.activityname} className="user-activities">
                                                        {activity.activityname} || {activity.activitylocation} || {activity.category}

                                                        <div className="deleteButton" onClick={ async () => {
                                                            await this.props.dispatch(deleteActivity(activity.activityname));

                                                            await this.props.dispatch(groupActivitiesForPlanPage());

                                                            for (let i = 1; i<this.props.numOfDays; i++) {
                                                                console.log("checking the loop", i);
                                                                await this.props.dispatch(checkingActivitiesInDays(i));
                                                            }

                                                            await this.props.dispatch(showAddButtonAtFirst());

                                                        }}>&nbsp;|| DELETE </div>
                                                        <br/><br/>
                                                    </div>
                                                );
                                            }
                                        )
                                    }

                                </div>
                            );

                        })}
                </div>
                <Link to="/working-area"> <button className="moreButton">Back to main </button></Link>
            </div>
        );
    }

}




function mapStateToProps(state) {

    return {
        city: state.city,
        userActivities: state.userActivities,
        numOfDays: state.numOfDays,
        categoryResults: state.categoryResults,
        groupedActivities: state.groupedActivities,
        backgroundUrl: state.backgroundUrl
    };
}



export default connect(mapStateToProps)(Plan);
