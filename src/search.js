//incremental search for cities and selecting the number of day the user is going to stay there

import React from "react";
import { connect } from "react-redux";

import { getSearchResults,
    changeBackground,
    hideResults,
    setDays,
    putCityInState,
    getWeather,
    createArrayOfDaysInState,
    showAddButtonAtFirst,
    addCityCount,
    getPopularCities,
    setCoordinatesAndPutOptionsIntoDB
} from "./actions.js";

import { Link } from 'react-router-dom';


class Search extends React.Component {
    constructor() {
        super();
        this.state = {daysFilled: false};
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    //this happens when i select a day.
    handleDayChange(e) {
        //if the user did not select a valid amount of days
        if (e.target.value == "null") {
            this.setState({
                daysFilled: false
            });
        } else {
            this.setState({
                daysFilled: true
            });
        }
        //putting the selected number of days in state
        this.props.dispatch(setDays(e.target.value));

        //putting an array from 1 to numOfDays in state too
        let arrOfDays = [];
        for (let i = 0; i<e.target.value; i++) {
            arrOfDays.push(i+1);
        }
        this.props.dispatch(createArrayOfDaysInState(arrOfDays));
    }

    //putting location/address in state
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //when you delete the city you previously put in (from the search field), city gets re-set to null in state, so that the button will be greyed out again
    handleSearchChange(searchValue) {
        if (searchValue.length == 0) {
            this.props.dispatch(putCityInState(null));
        }
    }

    getClass() {
        if ((!this.props.city) || !this.state.daysFilled) {
            return "greyed";
        } else {
            return;
        }
    }

    render() {
        return(
            <div className="search-container">
                <p>Select your next destination!</p>
                <input
                    className = "searchbar"
                    type="text"
                    placeholder="Choose a city"
                    onChange={e => {
                        this.props.dispatch(getSearchResults(e.target.value));
                        //checking if the searchfield is empty
                        this.handleSearchChange(e.target.value);
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
                                            //updating the three popular cities with respect to the new click
                                            const prom = this.props.dispatch(addCityCount(r.city));
                                            prom.then(()=>{
                                                this.props.dispatch(getPopularCities());
                                            });
                                            //setting button for adding activities to true by default
                                            this.props.dispatch(showAddButtonAtFirst());
                                        }}>
                                        {r.city}
                                    </div>
                                    {/*if an error was sent back from the server*/}
                                    <div className="result-error">{r.error}</div>
                                </div>
                            );
                        })}
                </div> <br/>

                <div className="address-selection">
                    <p>Address/neighbourhood of your stay (optional)</p>
                    <input
                        name = "address"
                        type="text"
                        placeholder="Your location"
                        //putting it in state
                        onChange={this.handleInput}
                    />
                </div>

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
                <br/>
                <br/>
                {/*the button is only clickable if both city and days are selected
                on click it creates an entry in the options table containing city, numofdays and address*/}
                <Link to="/working-area">
                    <button className={this.getClass()} disabled={(!this.props.city || !this.state.daysFilled)} onClick={ () => {
                        this.props.dispatch(setCoordinatesAndPutOptionsIntoDB(this.state.address, this.props.city, this.props.numOfDays));
                    }}> Submit </button></Link>
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
