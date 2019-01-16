//incremental search for cities and selecting the number of day the user is going to stay there

import React from "react";
import { connect } from "react-redux";
// import axios from "./axios";

import { getSearchResults,
    changeBackground,
    hideResults,
    setDays,
    showError,
    hideError,
    putCityInState,
    getWeather,
    createArrayOfDaysInState,
    showAddButtonAtFirst,
    addCityCount,
    getPopularCities,
    currentPopularCity,
    setCoordinatesAndPutOptionsIntoDB
} from "./actions.js";
import { Link } from 'react-router-dom';


class Search extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }


    //this happens when i select a day.
    //I check whether the user selected a valid field (if yes I set the state of days)
    //and I also check whether the city is selected. if it's not the error urging the user to select both fields is shown
    handleDayChange(e) {
        //if i selected a valid day
        if (e.target.value != "null") {
            this.props.dispatch(setDays(e.target.value));
            //if i selected some valid number of days AND the city is not empty
            if (!document.querySelector('.searchbar').value == "") {
                this.props.dispatch(hideError());
            } else {
                //if the day is selected but the city is not, i don't hide the error
                this.props.dispatch(showError());
            }
            //to put the whole array into the state
            let arrOfDays = [];

            for (let i = 0; i<e.target.value; i++) {
                arrOfDays.push(i+1);
            }
            this.props.dispatch(createArrayOfDaysInState(arrOfDays));
        }
        //if i didnt select the valid day
        else {
            this.props.dispatch(showError());
        }
    }

    //here i check whether to hide error or not depending whether the days are also selected (after the city is selected)
    handleCityChange() {
        if (!this.props.numOfDays) {
            this.props.dispatch(showError());
        } else {
            this.props.dispatch(hideError());
        }
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }



    render() {
        return(
            <div className="search-container">
                <input
                    className = "searchbar"
                    type="text"
                    placeholder="Choose a city"
                    //either the popular city the user selected or null
                    onChange={e => {
                        this.props.dispatch(getSearchResults(e.target.value));
                        this.props.dispatch(currentPopularCity());
                    }
                    }/>
                {/*this is only shown if we have looked for something and put the search results into state*/}
                <div className="searchResults">
                    {this.props.searchResults && this.props.searchResults.map(
                        r => {
                            return (
                                <div key={r.id} className="results-container">
                                    <div className="result-info"
                                        onClick={() => {
                                            document.querySelector('.searchbar').value = r.city;
                                            this.props.dispatch(hideResults());
                                            this.props.dispatch(changeBackground(r.city.replace(/\s+/g, '+')));
                                            this.props.dispatch(putCityInState(r.city));
                                            this.props.dispatch(getWeather(r.city.replace(/\s+/g, '+')));
                                            const prom = this.props.dispatch(addCityCount(r.city));
                                            prom.then(()=>{
                                                this.props.dispatch(getPopularCities());
                                            });
                                            this.handleCityChange();
                                            this.props.dispatch(showAddButtonAtFirst());
                                        }}>
                                        {r.city}
                                    </div>
                                    <div className="result-error">{r.error}</div>
                                </div>
                            );
                        })}
                </div>
                <br/>
                <br/>
                <div className="day-selector">
                    <p>Select how many days you are staying</p>
                    <select onChange={this.handleDayChange}>
                        <option value = "null">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="address-selection">
                    <p>Address/neighbourhood of your stay (optional)</p>
                    <input
                        name = "address"
                        type="text"
                        placeholder="Your location"
                        onChange={this.handleInput}
                    />
                </div>
                <br/>
                <br/>
                {this.props.error && <div className="error">{this.props.error}</div>}
                {(!this.props.error && this.props.numOfDays && !document.querySelector('.searchbar').value == "")
                && <Link to="/working-area">
                    <button onClick={ () => {
                        this.props.dispatch(setCoordinatesAndPutOptionsIntoDB(this.state.address, this.props.city, this.props.numOfDays));
                    }}> Submit </button></Link>}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        error: state.error,
        numOfDays: state.numOfDays,
        backgroundUrl: state.backgroundUrl,
        popularCities: state.popularCities,
        currentPopularCity: state.currentPopularCity,
        coord: state.coord,
        city: state.city
    };
}

export default connect(mapStateToProps)(Search);
