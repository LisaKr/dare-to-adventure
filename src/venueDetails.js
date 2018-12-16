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
                                {v.name}  || {v.category} || {v.likes}  || {v.rating && <span>Rating: {v.rating}</span>}
                                <br/><br/>
                                Price range: {v.price}
                                <br/><br/>
                                {v.description}
                                <br/><br/>
                                {v.tip && <span>Other users say: {v.tip}</span>}
                                <br/><br/>
                                <img src={v.imgurl} className="venue-image"/>
                                <br/>
                                <a href={v.url} target="_blank" rel="noopener noreferrer">Website</a>
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
        venueDetails: state.venueDetails    };
}



export default connect(mapStateToProps)(VenueDetails);
