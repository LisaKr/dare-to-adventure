//redirecting in the welcome component

import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import Frontpage from './frontpage';



export default function Welcome() {
    return (
        <div className="page">
            <div className="welcome-container">
                <HashRouter>
                    <div>
                        <Route exact path = "/" component = {Frontpage} />
                        <Route path = "/registration" component = {Registration} />
                        <Route path = "/login" component = {Login} />
                    </div>
                </HashRouter>

            </div>
        </div>
    );
}
