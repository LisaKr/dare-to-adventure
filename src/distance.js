import React from "react";

import {setDistanceToState} from "./actions.js";


export default class Distance extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="distance"> Distance: <br/><br/>
                <input type="radio"  name="selectedcake" value="< 1 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("1000"));
                    }}/> &lt; 1 km
                <input type="radio"  name="selectedcake" value="< 5 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("5000"));
                    }}/> &lt; 5 km
                <input type="radio"  name="selectedcake" value="< 10 km"
                    onClick={()=> {
                        this.props.dispatch(setDistanceToState("10000"));
                    }}/> &lt; 10 km
            </div>
        );
    }
}
