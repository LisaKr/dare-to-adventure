import React from "react";
import { connect } from "react-redux";

import {setDistanceToState} from "./actions.js";


class Distance extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="distance"> <span>Distance:</span> <br/>
                <input type="radio" value="< 1 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("1000"));
                    }}/><span>&lt;1 km</span>
                <input type="radio" value="< 5 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("5000"));
                    }}/><span>&lt;5 km</span>
                <input type="radio" value="< 10 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("10000"));
                    }}/><span>&lt;10 km</span>
            </div>
        );
    }
}


export default connect(null)(Distance);
