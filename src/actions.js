import axios from './axios';


export async function getSearchResults(request) {

    //if there is nothing in the request (e.g. if the user deleted what they typed) do not even show the searchResults div in the component
    if (request == "") {
        return {
            type: "GET_SEARCH_RESULTS",
            searchResults: null
        };
    }

    //if there is something in the request, make a request to the server
    let resp = await axios.get("/search/" + request);

    if (resp.data == "") {
        resp.data = [{error: "No results found"}];
    }

    console.log("search results from the back in action", resp.data);

    return {
        type: "GET_SEARCH_RESULTS",
        //array of objects
        searchResults: resp.data
    };
}

export async function hideResults() {
    return {
        type: "GET_SEARCH_RESULTS",
        searchResults: null
    };
}

export async function changeBackground(city) {
    let cityUrl = await axios.get("/current-city-pic/" + city);

    return {
        type: "CHANGE_BACKGROUND",
        backgroundUrl: cityUrl.data
    };
}

export async function putCityInState(city) {
    return {
        type: "SET_CITY",
        city: city
    };
}

export async function setDays(numOfDays) {
    return {
        type: "SET_DAYS",
        numOfDays: numOfDays
    };
}

export async function createArrayOfDaysInState(arrOfDays) {
    return {
        type: "SET_ARRAY_OF_DAYS",
        arrOfDays: arrOfDays
    };
}

export async function showError() {
    return {
        type: "SHOW_ERROR",
        error: "All fields must be filled out!"
    };
}

export async function hideError() {
    return {
        type: "SHOW_ERROR",
        error: null
    };
}

export async function getCategoryResults(city, category, offset){
    // console.log("stuff passed from front to action", city, category, offset);

    let resp = await axios.get("/venues/" + city + "/" + category + "/" + offset);
    // console.log("api results on the front", resp.data);

    if (offset == 0) {
        return {
            type: "SHOW_CATEGORY_RESULTS",
            categoryResults: resp.data,
            offset: 10
        };
    } else {
        return {
            type: "SHOW_CATEGORY_RESULTS",
            offset: offset + 10,
            categoryResults: resp.data
        };
    }

}

// export async function getNextCategoryResults(city, category, offset){
//     console.log("stuff passed from front to action in the NEXT ACTION", city, category, offset);
//
//     let resp = await axios.get("/venues/" + city + "/" + category + "/" + offset);
//     console.log("api results on the front", resp.data);
//     return {
//         type: "SHOW_CATEGORY_RESULTS",
//         offset: offset + 10,
//         categoryResults: resp.data
//     };
// }


export async function hideCategoryResults(){
    return {
        type: "HIDE_CATEGORY_RESULTS",
        categoryResults: null,
        showMenu: false
    };
}

export async function setCategoryToState(category) {
    return {
        type: "SET_CATEGORY",
        category: category
    };
}

// export async function setOffsetInState() {
//
//     // console.log("current offset passed from the front BEFORE INCREMENTING", currentOffset);
//     return {
//         type: "SET_OFFSET",
//     };
// }

export async function getVenueDetails(id) {

    let resp = await axios.get("/venue-details/" + id);
    console.log("venue details on the front", resp.data);

    return {
        type: "GET_VENUE_DETAILS",
        venueDetails: resp.data
    };
}

export async function hideVenue(){
    return {
        type: "GET_VENUE_DETAILS",
        venueDetails: null,
        showMenu: false
    };
}

export async function getWeather(city){

    let resp = await axios.get("/weather/" + city);

    return {
        type: "GET_WEATHER",
        weather: resp.data
    };
}


export async function showAddingMenu(name, location){
    return {
        type: "SHOW_ADDING_MENU",
        showMenu: true,
        addingMenuName: name,
        addingMenuLocation: location
    };
}

export async function hideAddingMenu(){
    return {
        type: "SHOW_ADDING_MENU",
        showMenu: false
    };
}

export async function setActivityInState(selectedName, selectedLocation) {

    // let selectedActivity = selectedName + " || " + selectedLocation;

    // console.log("selected activity", selectedActivity);

    return {
        type: "SET_ACTIVITY",
        selectedActivityName: selectedName,
        selectedActivityLocation: selectedLocation
    };
}

export async function addVenue(city, activityName, activityLocation, category, day, numOfDays) {

    try {
        if (category == "4d4b7105d754a06374d81259") {
            category = "Food";
        } else if (category == "4d4b7104d754a06370d81259") {
            category = "Culture";
        } else if (category == "4d4b7105d754a06377d81259") {
            category = "Nature & Outdoors";
        } else {
            category = "Nightlife";
        }

        // console.log("action", city, activity, category, day, numOfDays);
        let resp = await axios.get("/add-venue/" + city + "/" + activityName + "/" + activityLocation + "/" + category + "/" + day+ "/" + numOfDays);
        console.log("resp after adding", resp.data);

        if (resp.data.error) {
            return {
                type: "SHOW_ADDING_ERROR",
                addingError: "Oops! Seems like you're trying to add something that's already on your list",
                addedActivity: null
            };
        } else {
            return {
                type: "SHOW_ADDING_ERROR",
                addingError: null
            };
        }
    } catch(err) {
        console.log("error in adding venue", err);
    }
}

export async function checkingActivitiesInDays(day) {
    //after inserting I would check whether this day already has 5 activities and if yes, I need to remove adding ability
    try {
        let dayResp = await axios.get("/check-day/" + day);


        console.log("activities for each day on the front", day, dayResp.data.length);

        if (dayResp.data.length >= 5) {
            return {
                type: "REMOVE_DAY",
                day: day
            };

        //if the day contains less than 5 activities I send this action. reducer will see if the day is already
        //in the array and if it has capacities but is not in the array it will be added
        } else {
            return {
                type: "ADD_DAY_AGAIN",
                day: day
            };
        }
    } catch(err) {
        console.log("error in checking day activities", err);
    }

}


export async function successfullyAdded(activity) {
    return {
        type: "SUCCESSFULLY_ADDED",
        addedActivity: activity
    };
}

export async function hideAddedActivity() {
    return {
        type: "SUCCESSFULLY_ADDED",
        addedActivity: null
    };
}

export async function hideAddButton() {
    return {
        type: "HIDE_OR_SHOW_ADD_BUTTON",
        showAddButton: false
    };
}

export async function showAddButtonAtFirst() {
    return {
        type: "HIDE_OR_SHOW_ADD_BUTTON",
        showAddButton: true
    };
}

export async function userDidSomeWork() {
    return {
        type: "USER_DID_SOME_WORK",
        userDidSomeWork: true
    };
}

export async function putActivitiesInState(city) {
    let resp = await axios.get("/get-activities/" + city);

    return {
        type: "SET_USER_ACTIVITIES",
        userActivities: resp.data
    };
}


export async function deleteActivity(activityName) {
    console.log("deleting action runs", activityName);
    await axios.get("/delete/" + activityName);

    return {
        type: "REMOVE_ACTIVITY",
        activityToRemove: activityName
    };

}

export async function setDeletablePropertyToFalse(resultName) {
    return {
        type: "SET_DELETABLE_PROPERTY_TO_FALSE",
        resultName: resultName
    };
}

export async function setDeletablePropertyToTrue(resultName) {
    return {
        type: "SET_DELETABLE_PROPERTY_TO_TRUE",
        resultName: resultName
    };
}

export async function setWeatherBackground(is_day) {
    if (is_day == 1) {
        return {
            type: "SET_WEATHER_BACKGROUND",
            weatherBackground: "/day_weather.png"
        };
    } else {
        return {
            type: "SET_WEATHER_BACKGROUND",
            weatherBackground: "/night_weather.jpg"
        };
    }
}

export async function groupActivitiesForPlanPage() {
    console.log("group by action");
    return {
        type: "GROUP_BY_DAYS"
    };
}

export async function addCityCount(city) {
    await axios.get("/add-count/" + city);

    return {
        type: "NOTHING_SPECIAL"
    };
}

export async function getPopularCities() {
    let resp = await axios.get("/get-popular-cities");

    console.log("popular cities on the front", resp.data);

    return {
        type: "GET_POPULAR_CITIES",
        popularCities: resp.data
    };
}


export async function checkIfActivityAlreadyAddedToThisDay(activityName, city, day) {
    console.log("action runs to check");
    let resp = await axios.get("/get-activity/" + activityName + "/" + city + "/" + day);
    console.log("checking in action", resp.data);

    return {
        type: "CHECK_IF_ACTIVITY_ADDED",
        activity: resp.data
    };
}

export async function showAddingError() {
    return {
        type: "SHOW_ADDING_ERROR",
        addingError: true
    };
}

export async function hideAddingError() {
    return {
        type: "HIDE_ADDING_ERROR",
        addingError: false
    };
}
