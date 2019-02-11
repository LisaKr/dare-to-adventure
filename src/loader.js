import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

class Loader extends React.Component {

    componentDidMount() {
        console.log("loader");
    }

    render() {
        return(
            <Loading>
                <img className="icon " src="/loader.gif"/>
            </Loading>
        );
    }
}

export default connect(null)(Loader);
