import React from "react";
import { connect } from "react-redux";

import { setWeatherBackground } from "./actions.js";


class Weather extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="weather-container">
                {this.props.weatherBackground && <img className="weather-pic" src={this.props.weatherBackground}/>}

                {(this.props.weather && this.props.city) && this.props.weather.map(
                    w => {
                        this.props.dispatch(setWeatherBackground(w.is_day));
                        return (
                            <div key={w.temperature} className="weather">
                                {this.props.city} <br/>
                                {w.temperature}° C
                                <br/>
                                <img src={w.iconurl}/>
                            </div>
                        );
                    }
                )}
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
