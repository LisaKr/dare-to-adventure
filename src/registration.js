import React from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';



export default class Registration extends React.Component {
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
            let resp = await axios.post("/register-user", this.state);
            console.log("registration resp on the front", resp);
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
            <div className="registration-container">
                <h2>Sign up</h2>
                <form onSubmit={this.handleSubmit} className="registration-form-container">
                    <input type="text" name="first" autoComplete="off" placeholder="First Name" onChange={this.handleInput}/>
                    <input type="text" name="last" autoComplete="off" placeholder="Last name" onChange={this.handleInput}/>
                    <input type="text" name="email" autoComplete="off" placeholder="e-mail" onChange={this.handleInput}/>
                    <input type="password" name="password" autoComplete="off" placeholder="password" onChange={this.handleInput}/>
                    <div className="error-message"> {this.state.error} </div>
                    <div className="slider-button"> <button> Sign Up! </button> </div>
                </form>
                <br/><br/>
                <Link to="/login" className="no-underline"> <span className="test">Already registered? Log in here! </span></Link>
            </div>
        );
    }

}
