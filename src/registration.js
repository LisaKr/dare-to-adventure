import React from "react";
import axios from "./axios";


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
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="first" autoComplete="off" onChange={this.handleInput}/>
                    <input type="text" name="last" autoComplete="off" onChange={this.handleInput}/>
                    <input type="text" name="email" autoComplete="off" onChange={this.handleInput}/>
                    <input type="password" name="password" autoComplete="off" onChange={this.handleInput}/>
                    <div className="error-message"> {this.state.error} </div>
                    <button> Sign Up!</button>
                </form>
            </div>
        );
    }

}
