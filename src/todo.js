import React from "react";




export default function Todo() {
    return (
        <div className="todo-container">
            <h1> Future features </h1>
            <ul>
                <li> On getting API category results loop through them to adjust add/delete buttons</li>
                <li> Add event integration from eventbrite API (find events for that city for specific dates) 📅</li>
                <li> Make it responsive 📱 </li>
                <li> DRY out the code -- get rid of DOM manipulation? Add clicking on the document to close subcategories?</li>
                <li> Allow users to choose options such as opening times, wifi etc</li>
                <li> Loading screen: show the element when the axios request goes to the server and hide it when the results come in from the back</li>
                <li> Make the PDF export look acceptable 📖</li>
                <li> Find a way to hide the more button if the results are divisible by 10, but there is nothing coming up </li>
            </ul>
        </div>
    );
}
