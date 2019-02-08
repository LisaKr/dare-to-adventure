//showing the weather for the respective city

import React from "react";
import { connect } from "react-redux";

import { setWeatherBackground } from "./actions.js";


class Weather extends React.Component {
    render() {

        return(
            <div className="weather-container">
                {this.props.weatherBackground && <img className="weather-pic" src={this.props.weatherBackground}/>}

                {(this.props.weather && this.props.city) && this.props.weather.map(
                    w => {
                        this.props.dispatch(setWeatherBackground(w.is_day));
                        return (
                            <div key={w.temperature} className="weather">
                                <span className="weather-city">{this.props.city} <br/></span>
                                <span className="weather-temp">{w.temperature}° C</span>
                                <br/>
                                <img src={w.iconurl}/>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        city: state.city,
        weather: state.weather,
        weatherBackground: state.weatherBackground
    };
}

export default connect(mapStateToProps)(Weather);
