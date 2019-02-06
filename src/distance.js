import React from "react";
import { connect } from "react-redux";

import {setDistanceToState} from "./actions.js";


class Distance extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="distance"> Distance: <br/><br/>
                <input type="radio" value="< 1 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("1000"));
                    }}/>&lt;1 km
                <input type="radio" value="< 5 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("5000"));
                    }}/>&lt;5 km
                <input type="radio" value="< 10 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("10000"));
                    }}/>&lt;10 km
            </div>
        );
    }
}


export default connect(null)(Distance);
