import React from "react";
import { connect } from "react-redux";


class Weather extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="weather-container">
                {(this.props.weather && this.props.city) && this.props.weather.map(
                    w => {
                        return (
                            <div key={w.temperature} className="weather">
                            Current weather in {this.props.city}: <br/>
                                {w.temperature}° Celcius
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
        weather: state.weather
    };
}



export default connect(mapStateToProps)(Weather);
