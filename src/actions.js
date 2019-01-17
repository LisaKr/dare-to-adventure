import axios from './axios';


//////////////ACTION TO DECIDE WHETHER TO SHOW SETUP OR WORKING AREA////////////
//seeing if user already did some work for this city
export async function userDidSomeWork() {
    return {
        type: "USER_DID_SOME_WORK",
        userDidSomeWork: true
    };
}

/////////////////////////////////ACTIONS FOR THE PAGE SETUP/////////////////////////////

////////GET SEARCH RESULTS FOR CITIES/////

//increment counter for a specific city when user selects it
export async function addCityCount(city) {
    try {
        await axios.get("/add-count/" + city);

        return {
            type: "NOTHING_SPECIAL"
        };
    } catch(err) {
        console.log("error in adding city count", err);
    }
}

//get cities that have the most count
export async function getPopularCities() {
    try {
        let resp = await axios.get("/get-popular-cities");

        return {
            type: "GET_POPULAR_CITIES",
            popularCities: resp.data
        };
    } catch(err) {
        console.log("error in getting popular cities", err);
    }
}


//the incoming search request is coming from the e.target.value of the search field
export async function getSearchResults(request) {

    //if there is nothing in the request (e.g. if the user deleted what they typed) do not even show the searchResults div in the component
    if (request == "") {
        return {
            type: "GET_SEARCH_RESULTS",
            searchResults: null
        };
    }

    try {
        //if there is something in the request, make a request to the server
        let resp = await axios.get("/search/" + request);

        //if there is nothing in the database matching the search then set the "error" property of data
        if (resp.data == "") {
            resp.data = [{error: "No results found"}];
        }

        //otherwise pass the results coming from the database to the reducer
        return {
            type: "GET_SEARCH_RESULTS",
            searchResults: resp.data
        };
    } catch(err) {
        console.log("error in getting search results", err);
    }
}

//setting results to null when the results need to be hidden (e.g. after selecting a city)
export async function hideResults() {
    return {
        type: "GET_SEARCH_RESULTS",
        searchResults: null
    };
}

//getting a respective background based on the chosen city from the Pexels API
export async function changeBackground(city) {
    try {
        let cityUrl = await axios.get("/current-city-pic/" + city);

        return {
            type: "CHANGE_BACKGROUND",
            backgroundUrl: cityUrl.data
        };
    } catch(err) {
        console.log("error in changing background", err);
    }
}

//putting weather for selected city in state
export async function getWeather(city){
    try {
        let resp = await axios.get("/weather/" + city);

        return {
            type: "GET_WEATHER",
            weather: resp.data
        };
    } catch(err) {
        console.log("error in getting weather", err);
    }
}

//setting weather background
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

//saving the selected city in the state for later usage
export async function putCityInState(city) {
    return {
        type: "SET_CITY",
        city: city
    };
}

//saving the selected amount of days in the state for later usage
export async function setDays(numOfDays) {
    return {
        type: "SET_DAYS",
        numOfDays: numOfDays
    };
}

//saving an array of days based on the amount of days the user selected in state for later usage
export async function createArrayOfDaysInState(arrOfDays) {
    return {
        type: "SET_ARRAY_OF_DAYS",
        arrOfDays: arrOfDays
    };
}

//////setting coordinates in the state
export async function setCoordinatesAndPutOptionsIntoDB(address, city, numOfDays) {
    try {
        //first getting coordinates
        var coord = await axios.get("/coord/" + address);
        console.log("coord resp in action", coord.data);

        let lat, lng;
        if (coord.data == null) {
            lat = undefined;
            lng = undefined;
        } else {
            lat = coord.data.lat;
            lng = coord.data.lng;
        }

        //then inserting all the options into db
        await axios.post("/insert-options/" + city + "/" + numOfDays + "/" + lat +"/" + lng);
    } catch(err) {
        console.log("ERROR IN ACTION OF SETTING COORDINATES", err);
    }


    return {
        type: "SET_COORDINATES",
        coord: coord.data,
        address: address
    };
}

export async function putCoordinatesIntoState(coord) {
    return {
        type: "SET_COORDINATES",
        coord: coord
    };
}

export async function setDistanceToState(distance) {
    return {
        type: "SET_DISTANCE",
        distance: distance
    };
}


//Setting the error in case the user did not select both city and days
export async function showError() {
    return {
        type: "SHOW_ERROR",
        error: "Please fill out all fields to proceed!"
    };
}

//hide this error once all fields are filled out
export async function hideError() {
    return {
        type: "SHOW_ERROR",
        error: null
    };
}

///////////////////////////ACTIONS FOR THE WORKING AREA///////////////////

//when loading all pre-existing information of the user into state we also load the activities they already added
export async function putActivitiesInState(city) {
    try {
        let resp = await axios.get("/get-activities/" + city);

        return {
            type: "SET_USER_ACTIVITIES",
            userActivities: resp.data
        };
    } catch(err) {
        console.log("error in getting user activities", err);
    }
}

//after loading the user activities we group them by days to show on the itinerary page
export async function groupActivitiesForPlanPage() {
    return {
        type: "GROUP_BY_DAYS"
    };
}

//the offset is zero on the first click on the category, in the subsequent requests it is replaced with the state offset
export async function getCategoryResults(lat, lng, city, categoryOrIntent, offset, option, distance){

    try {
        let resp = await axios.get("/venues/" + lat + "/" + lng + "/" + city + "/" + categoryOrIntent + "/" + offset + "/" + option + "/" + distance);

        if (resp.data.length == 0) {
            return {
                type: "SHOW_CATEGORY_RESULTS",
                categoryResults: [],
                offset: 0
            };
        }
        //if it's the first request to get category results the next request will have an offset of 10
        if (offset == 0) {
            return {
                type: "SHOW_CATEGORY_RESULTS",
                categoryResults: resp.data,
                offset: 10
            };
        //if it's a subsequent request the next request will have an offset of current offset + 10
        } else {
            return {
                type: "SHOW_CATEGORY_RESULTS",
                offset: offset + 10,
                categoryResults: resp.data
            };
        }
    } catch(err) {
        console.log("error in getting category results", err);
    }
}

//hiding the results pop-up on click on the hiding button
export async function hideCategoryResults(){
    return {
        type: "HIDE_CATEGORY_RESULTS",
        categoryResults: null,
        showMenu: false
    };
}

//put the currently selected category into state for the subsequent requests
export async function setCategoryToState(category) {
    return {
        type: "SET_CATEGORY",
        category: category
    };
}

//put the enpoint option in the state for the more button
export async function setOptionToState(option) {
    return {
        type: "SET_OPTION",
        option: option
    };
}
//SHOW RESULTS OF SUB CATEGORIES
export async function showFoodSubCategories(category) {
    return {
        type: `SHOW_SUB_CATEGORY`,
        category: category
    };
}

//SHOW/HIDE DINNER OPTIONS

export async function hideDinnerOptions() {
    return {
        type: `HIDE_DINNER_OPTIONS`,
        dinnerShown: false
    };
}

export async function showDinnerOptions() {
    return {
        type: `SHOW_DINNER_OPTIONS`,
        dinnerShown: true
    };
}
//getting details of the currently selected venue
export async function getVenueDetails(id) {

    try {
        let resp = await axios.get("/venue-details/" + id);

        return {
            type: "GET_VENUE_DETAILS",
            venueDetails: resp.data
        };
    } catch(err) {
        console.log("error in getting venue details", err);
    }
}

//hiding the venue information on click on the closing button
export async function hideVenue(){
    return {
        type: "GET_VENUE_DETAILS",
        venueDetails: null,
        showMenu: false
    };
}

//the menu that is being shown up when the user clicks on "add to list"
//puts the name and location of the selected venue in state for further usage
export async function showAddingMenu(){
    return {
        type: "SHOW_OR_HIDE_ADDING_MENU",
        showMenu: true
    };
}

//hide the adding menu by clicking on "Cancel"
export async function hideAddingMenu(){
    return {
        type: "SHOW_OR_HIDE_ADDING_MENU",
        showMenu: false
    };
}

export async function hideSubCategories(){
    return {
        type: "HIDE_SUBCATEGORIES",
        subcategoryToShow: null
    };
}

//put the currently selected activity in state (e.g. to check whether this activity was alreaddy added to this particular day and show that it was successfully added to your list)
export async function setActivityInState(selectedName, selectedLocation) {
    return {
        type: "SET_ACTIVITY",
        selectedActivityName: selectedName,
        selectedActivityLocation: selectedLocation
    };
}

//trying to get the activity that is being added from the db. if the response is empty it means the activity was not added yet
export async function checkIfActivityAlreadyAddedToThisDay(activityName, city, day) {
    let resp = await axios.get("/get-activity/" + encodeURIComponent(activityName) + "/" + encodeURIComponent(city) + "/" + encodeURIComponent(day));

    return {
        type: "CHECK_IF_ACTIVITY_ADDED",
        activity: resp.data
    };
}

//if the activity was already added
export async function showAddingError() {
    return {
        type: "SHOW_ADDING_ERROR",
        addingError: true
    };
}

//hide the error pup-up when you exit the parent pop-up
export async function hideAddingError() {
    return {
        type: "HIDE_ADDING_ERROR",
        addingError: false
    };
}

//adding activity to the db
export async function addVenue(city, activityName, activityLocation, category, day, numOfDays) {
    try {

        //categories need to be translated into names. sad but has to be done
        if (category == "4d4b7105d754a06374d81259") {
            category = "Food";
        } else if (category == "4d4b7104d754a06370d81259") {
            category = "Culture";
        } else if (category == "4d4b7105d754a06377d81259") {
            category = "Nature & Outdoors";
        } else if (category=="4d4b7105d754a06376d81259") {
            category = "Nightlife";
        } else if (category=="4bf58dd8d48988d110941735") {
            category = "Italian Dinner";
        } else if (category=="4bf58dd8d48988d142941735") {
            category = "Asian Dinner";
        } else if (category=="4bf58dd8d48988d10d941735") {
            category = "German Dinner";
        } else if (category=="4bf58dd8d48988d16c941735") {
            category = "Burger Dinner";
        } else if (category=="4bf58dd8d48988d1c1941735") {
            category = "Mexican Dinner";
        } else if (category=="4bf58dd8d48988d181941735") {
            category = "Museum";
        } else if (category == "4bf58dd8d48988d1e2931735") {
            category="Gallery";
        } else if (category == "4bf58dd8d48988d137941735") {
            category="Theater";
        } else if (category == "4bf58dd8d48988d17f941735") {
            category="Cinema";
        } else if (category == "5032792091d4c4b30a586d5c") {
            category="Music";
        } else if (category == "4bf58dd8d48988d11b941735") {
            category="Pub";
        } else if (category == "4bf58dd8d48988d11e941735") {
            category="Cocktail bar";
        } else if (category == "4bf58dd8d48988d1d8941735") {
            category="Queer bar";
        } else if (category == "4bf58dd8d48988d11f941735") {
            category="Clubbing";
        } else if (category == "4bf58dd8d48988d123941735") {
            category="Wine bar";
        } else if (category == "4bf58dd8d48988d1e2941735") {
            category="Beach";
        } else if (category == "4bf58dd8d48988d163941735") {
            category="Park";
        } else if (category == "4bf58dd8d48988d161941735") {
            category="Lake";
        } else if (category == "4bf58dd8d48988d159941735") {
            category="Hiking";
        }

        //to prevent slashes in addresses in names so that it is not read as a part of the path
        activityName = activityName.replace(/\//g, " ");

        await axios.get("/add-venue/" + encodeURIComponent(city) + "/" + encodeURIComponent(activityName) + "/" + encodeURIComponent(activityLocation) + "/" + encodeURIComponent(category) + "/" + encodeURIComponent(day) + "/" + encodeURIComponent(numOfDays));
        //just so that it doesn't complain about async actions. actually no real action needed here
        return {
            type: "SHOW_ADDING_ERROR",
            addingError: false
        };
    } catch(err) {
        console.log("error in adding venue", err);
    }
}

///toggling the deletable status of an activity: if the user added it then it becomes deletable and vice versa
//needed to toggle between add and delete button
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

//after inserting  to a specific day I would check whether this day already has 5 activities and if yes, I need to remove adding ability
export async function checkingActivitiesInDays(day) {
    try {
        let dayResp = await axios.get("/check-day/" + day);

        console.log("day", day, "number of activities", dayResp.data.length);

        if (dayResp.data.length >= 5) {
            return {
                type: "REMOVE_DAY",
                day: day
            };

        //if the day contains less than 5 activities I send this action. reducer will see if the day is already
        //in the array and if it has capacities but is not in the array it will be added back. otherwise nothing will happen
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

//action to show pop-up that venue was succesfully added
export async function successfullyAdded(activity) {
    return {
        type: "SUCCESSFULLY_ADDED",
        addedActivity: activity
    };
}

//hide the pop-up indicating successful adding when clicking on the closing button
export async function hideAddedActivity() {
    return {
        type: "SUCCESSFULLY_ADDED",
        addedActivity: null
    };
}

//hiding the add functionality when all days are full with 5 activities
export async function hideAddButton() {
    return {
        type: "HIDE_OR_SHOW_ADD_BUTTON",
        showAddButton: false
    };
}

//by default start with showing the add button
export async function showAddButtonAtFirst() {
    return {
        type: "HIDE_OR_SHOW_ADD_BUTTON",
        showAddButton: true
    };
}

//deleting an activity from the plan
export async function deleteActivity(activityName) {
    activityName = activityName.replace(/\//g, " ");

    try {
        await axios.get("/delete/" + activityName);

        return {
            type: "REMOVE_ACTIVITY",
            activityToRemove: activityName
        };
    } catch(err) {
        console.log("error in deleting activity", err);
    }
}
