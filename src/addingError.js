import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

import {hideAddingError} from "./actions.js";

///TRYING OUT STYLED COMPONENTS/////
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999999;
    padding: 3em;
    width: 100%;
`;

const Upper = styled.div`
    background: #E94F37;
    padding: 1em;
    border-radius: 10px 10px 0 0;
`;

const Lower = styled.div`
    background: white;
    padding: 1em;
    border-radius: 0 0 10px 10px;
`;

///////////END OF TRYING OUT STYLED COMPONENTS////////

class AddingError extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Wrapper>
                <Upper>
                    <img className="icon" src="error_white.png"/>
                </Upper>
                <Lower>
                    <p>Oops! <br/> Seems you already added it to that day.</p>
                    <div className="addButton"
                        style={{float: "none"}}
                        onClick={() => {
                            this.props.dispatch(hideAddingError());
                        }}> Okay </div>
                </Lower>
            </Wrapper>
        );
    }
}


export default connect(null)(AddingError);
