//user gets redirected to the /logout path where the cookies are deleted, effectively logging them out

import React from 'react';

export default function Logout() {
    return (
        <div className="logout">
            <a href="/logout" className="front no-underline"> LOG OUT </a>
        </div>
    );
}
