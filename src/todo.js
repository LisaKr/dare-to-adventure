import React from "react";




export default function Todo() {
    return (
        <div className="todo-container">
            <h1> Future features </h1>
            <ul>
                <li> Make it responsive 📱 </li>
                <li> Add event integration from eventbrite API (find events for that city for specific dates) 📅</li>
                <li> Add sub-categories when choosing activities (e.g. Italian / Chinese etc or Museums / Theaters....) 📓</li>
                <li> Add PDF export 📖</li>
                <li> On getting API category results loop through them to adjust add/delete buttons</li>
                <li> Combine delete and on mount functions (because the sequence of actions is the same)</li>
                <li> Add functionality to selecting a popular city</li>
                <li>Add opening times</li>
                <li> Loading screen: show the element when the axios request goes to the server and hide it when the results come in from the back</li>

            </ul>
        </div>
    );
}
