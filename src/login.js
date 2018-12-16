import React from "react";
import { Link } from 'react-router-dom';
import axios from "./axios";



export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            let resp = await axios.post("/login-user", this.state);
            console.log("login resp on the front", resp);
            if (resp.data.error) {
                this.setState({
                    error: "Oops! Something went wrong, please try again!"
                });
            } else {
                location.replace("/");
            }
        } catch(err) {
            console.log("error in registration", err);
        }
    }

    render() {
        return(
            <div className="login-container">
                <h2>Log In</h2>
                <form onSubmit={this.handleSubmit} className="login-form-container">
                    <input type="text" name="email" autoComplete="off" placeholder="e-mail" onChange={this.handleInput}/>
                    <input type="password" name="password" autoComplete="off" placeholder="password" onChange={this.handleInput}/>
                    <div className="slider-button"><button> Log In! </button></div>
                </form>
            </div>
        );
    }

}
