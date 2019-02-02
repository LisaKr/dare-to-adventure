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
                                <img src={v.imgurl} className="venue-image"/>
                                <div className="venue-details">{v.name}  || {v.category} || {v.likes}  || {v.rating && <p>Rating: {v.rating}</p>} || <a href={v.url} target="_blank" rel="noopener noreferrer">Website</a></div>

                                <br/>
                                <span>Price range:</span> <br/> {v.price}
                                <br/><br/>
                                <span>Description:</span> <br/> {v.description}
                                <br/>
                                {v.tip && <p><span>Other users say:</span> <br/> {v.tip}</p>}
                                <br/><br/>
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
