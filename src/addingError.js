import React from "react";
import { connect } from "react-redux";

import {hideAddingError} from "./actions.js";

class AddingError extends React.Component {
    constructor() {
        super();
        // this.state = {class: "adding-error visible"};
    }

    // componentDidMount() {
    //     setTimeout(function () {
    //         this.setState({class: "adding-error hidden"});
    //     }.bind(this), 3000);
    // }

    render() {
        return(
            <div className="adding-error">
                <div className="upper-part">
                    <img className="icon" src="error_white.png"/>
                </div>
                <div className="lower-part">
                    <p>Oops! <br/> Seems you already added it to that day.</p>
                    <div className="addButton"
                        onClick={() => {
                            this.props.dispatch(hideAddingError());
                        }}> Okay </div>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         showAddingError: state.showAddingError
//     };
// }

export default connect(null)(AddingError);
