import React from "react";
import { connect } from "react-redux";
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
    getPopularCities } from "./actions.js";
import { Link } from 'react-router-dom';



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
    }


    //this happens when i select a day.
    //I check whether the user selected a valid field (if yes I set the state of days)
    //and I also check whether the city is selected. if it's not the error is still there
    handleDayChange(e) {
        //if i selected a valid day
        if (e.target.value != "null") {
            console.log("you selected a valid day");
            this.props.dispatch(setDays(e.target.value));
            //if i selected some valid number of days AND the city is not empty
            if (!document.querySelector('.searchbar').value == "") {
                this.props.dispatch(hideError());
            } else {
                this.props.dispatch(showError());
            }
            //if the day is selected but the city is not, i don't hide the error

            //to put the whole array into the state
            let arrOfDays = [];

            for (let i = 0; i<e.target.value; i++) {
                arrOfDays.push(i+1);
            }
            this.props.dispatch(createArrayOfDaysInState(arrOfDays));
        }
        //if i didnt select the valid day
        else {
            console.log("you selected nothing in the day select");
            this.props.dispatch(showError());
        }

    }

    //here i check whether to hide error or not depending whether the days are also selected
    handleCityChange() {
        //city is selected, this is how we came to here (after clicking a city)
        if (!this.props.numOfDays) {
            this.props.dispatch(showError());
        } else {
            this.props.dispatch(hideError());
        }

    }


    render() {

        return(
            <div className="search-container">

                <div className="popular-cities">
                    Popular cities our users like:
                    {this.props.popularCities && this.props.popularCities.map(
                        city => {
                            return(
                                <div className="popular-city" key={city.city}>
                                    {city.city}
                                </div>
                            );
                        }
                    )} <br/> <br/>
                </div>

                <input
                    className = "searchbar"
                    type="text"
                    placeholder="Choose a city"
                    onChange={e =>
                        this.props.dispatch(getSearchResults(e.target.value))
                    }/>


                <div className="searchResults">
                    {this.props.searchResults && this.props.searchResults.map(
                        r => {
                            return (
                                <div key={r.id} className="results-container">
                                    <div className="result-info">
                                        <div className="result-name"
                                            onClick={() => {
                                                console.log("i selected a city!");
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
                                </div>
                            );
                        }
                    )}
                </div>

                <br/>
                <br/>


                <div className="day-selector">
                    Select how many days you are staying!
                    <br/>
                    <br/>
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

                {this.props.error && <div className="error">{this.props.error}</div>}

                {(!this.props.error && this.props.numOfDays && !document.querySelector('.searchbar').value == "") && <Link to="/working-area"><button> Submit </button></Link>}

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
        popularCities: state.popularCities
    };
}

export default connect(mapStateToProps)(Search);
