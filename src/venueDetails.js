//a pop-up showing the details of the selected venue

import React from "react";
import { connect } from "react-redux";

import { hideVenue } from "./actions.js";

class VenueDetails extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="venue-details-container">

                {this.props.venueDetails && <div className="closingButton" onClick={ () => {this.props.dispatch(hideVenue());}}> X </div>}
                {this.props.venueDetails && this.props.venueDetails.map(
                    v => {
                        return (
                            <div key={v.id} className="venue">
                                {v.name}  || {v.category} || {v.likes}  || {v.rating && <p>Rating: {v.rating}</p>} || <a href={v.url} target="_blank" rel="noopener noreferrer" className="black">Website</a>

                                <br/>
                                <span>Price range:</span> {v.price}
                                <br/><br/>
                                <span>Description:</span> {v.description}
                                <br/>
                                {v.tip && <p><span>Other users say:</span> {v.tip}</p>}
                                <br/><br/>
                                <img src={v.imgurl} className="venue-image"/>
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
        venueDetails: state.venueDetails
    };
}

export default connect(mapStateToProps)(VenueDetails);
