import React from "react";
// import axios from "./axios";
import {connect} from "react-redux";

import { getPopularCities, currentPopularCity } from "./actions.js";


class PopularCities extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log(" setup runs!!!!!!!!");
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
                                this.props.dispatch(currentPopularCity(city.city));
                            }}>
                                {city.city}
                            </div>
                        );
                    }
                )
                }
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
