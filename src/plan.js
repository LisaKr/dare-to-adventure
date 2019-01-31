//showing the activities user selected so far in a grouped by day way

import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
} from "./actions.js";


class Plan extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        //only in case the user is reloading the page right after setup and before choosing any activities
        //in this case the user is redirected back to setup
        let userDidSomeWork = await axios.get("/check-user-history");
        if (userDidSomeWork.data == "" && !this.props.city) {
            this.props.history.push('/setup');
        }
        // on reload putting city and activities in state
        let arrOfDays = [];

        let resp = await axios.get("/current-city");
        let city = resp.data.replace(/\+/g, " ");

        let promise1 = this.props.dispatch(putCityInState(city));
        let promise2 = this.props.dispatch(changeBackground(city));
        let promise3 = this.props.dispatch(getWeather(city));
        let promise4 = this.props.dispatch(putActivitiesInState(city));

        Promise.all([promise1, promise2, promise3, promise4]).then(()=>{
            this.props.dispatch(groupActivitiesForPlanPage());
        });


        let response = await axios.get("/numofdays");

        this.props.dispatch(setDays(response.data));

        for (let i = 0; i<response.data; i++) {
            arrOfDays.push(i+1);
        }
        //to put the whole array into the state
        this.props.dispatch(createArrayOfDaysInState(arrOfDays));

        //adjusting the arrofdays is important because of the possibility of going back to main and
        //arr of days will be taken there as state
        for (let i = 1; i<arrOfDays.length+1; i++) {
            this.props.dispatch(checkingActivitiesInDays(i)).then(()=> {
                if (this.props.arrOfDays == []) {
                    this.props.dispatch(hideAddButton());
                } else {
                    this.props.dispatch(showAddButtonAtFirst());
                }
            });
        }
    }



    exportToPdf(e){
        e.preventDefault();
        const input = document.body;
        html2canvas(input, {scale: 0.8})
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/jpeg');
                const pdf = new jsPDF('l', 'mm');
                pdf.addImage(imgData, 'JPEG', 5, 10);
                pdf.save("myTravelPlan.pdf");
            });
    }

    render() {
        return(
            <div className="plan-container" id="capture">
                <img src={this.props.backgroundUrl} className="background"/>

                <h1> your trip to {this.props.city}</h1>

                <div className="day-container">
                    {/*groupedActivities is an object with days as keys and an array of objects (for every activity) as values
                    we are going through the keys (day) first*/}
                    {this.props.groupedActivities && Object.keys(this.props.groupedActivities).map(
                        day => {
                            return(
                                //this div contains the day and the activities belonging to it
                                <div key={day} className="grouped-day">
                                    <h3>
                                    Day {day}
                                    </h3>
                                    {/*now we are mapping through this keys value which is an array of objects
                                    and we get values of the current object such as name and location*/}
                                    {this.props.groupedActivities[day].map(
                                        activityObject => {
                                            return (
                                                //this div contains a list of activities with this day as key
                                                <div key={activityObject.activityname} className="user-activities">
                                                    {activityObject.activityname} || {activityObject.activitylocation} || {activityObject.category}

                                                    <div className="deleteButton" onClick={ async () => {
                                                        {/*same logic as in the delete button in categoryResults*/}
                                                        await this.props.dispatch(deleteActivity(activityObject.activityname));

                                                        await this.props.dispatch(groupActivitiesForPlanPage());

                                                        for (let i = 1; i<=this.props.numOfDays; i++) {
                                                            console.log("checking the loop", i);
                                                            await this.props.dispatch(checkingActivitiesInDays(i));
                                                        }

                                                        await this.props.dispatch(showAddButtonAtFirst());

                                                    }}>DELETE </div>
                                                    <br/><br/>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    {/*to force a line break in the flex flow*/}
                    <break></break>

                    <Link to="/working-area"> <button className="backButton">Back to main </button></Link>
                    {this.props.groupedActivities &&
                    <span><button onClick={this.exportToPdf} className="backButton small"> Export your travel plan
                    </button></span>}
                </div>
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
