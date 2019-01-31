//shows the current top 3 popular cities and puts the currently clicked popular city in state

import React from "react";
import {connect} from "react-redux";

import { getPopularCities, hideResults, changeBackground, putCityInState, getWeather, addCityCount, showAddButtonAtFirst} from "./actions.js";

class PopularCities extends React.Component {

    constructor() {
        super();
    }

    async componentDidMount() {
        this.props.dispatch(getPopularCities());
    }

    render () {
        return (
            <div className = "popular-cities" >
                <p>Popular cities</p>
                {this.props.popularCities && this.props.popularCities.map(
                    city => {
                        return (
                            <div className = "popular-city" key = {city.city} onClick={() => {
                                // this.props.dispatch(currentPopularCity(city.city));
                                document.querySelector('.searchbar').value = city.city;
                                this.props.dispatch(hideResults());
                                this.props.dispatch(changeBackground(city.city.replace(/\s+/g, '+')));
                                this.props.dispatch(putCityInState(city.city));
                                this.props.dispatch(getWeather(city.city.replace(/\s+/g, '+')));
                                const prom = this.props.dispatch(addCityCount(city.city));
                                prom.then(()=>{
                                    this.props.dispatch(getPopularCities());
                                });
                                this.props.dispatch(showAddButtonAtFirst());
                            }}>
                                {city.city}
                            </div>
                        );
                    })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        popularCities: state.popularCities
    };
}

export default connect(mapStateToProps)(PopularCities);
