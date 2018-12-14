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
        type: "SHOW_CATEGORY_RESULTS",
        categoryResults: null
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
        venueDetails: null
    };
}
