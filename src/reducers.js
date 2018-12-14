export default function(state = {}, action) {

    if (action.type == "GET_SEARCH_RESULTS") {
        return {
            ...state,
            searchResults: action.searchResults
        };
    }

    if (action.type == "CHANGE_BACKGROUND") {
        return {
            ...state,
            backgroundUrl: action.backgroundUrl
        };
    }

    if (action.type == "SET_CITY") {
        return {
            ...state,
            city: action.city
        };
    }

    if (action.type == "SET_CATEGORY") {
        return {
            ...state,
            category: action.category
        };
    }

    if (action.type == "SET_DAYS") {
        return {
            ...state,
            numOfDays: action.numOfDays
        };
    }

    if (action.type == "SHOW_ERROR") {
        return {
            ...state,
            error: action.error
        };
    }

    if (action.type == "SHOW_CATEGORY_RESULTS") {
        //if the action got nothing from the next api request, then hide everything
        if (action.categoryResults == 0) {
            return {
                ...state,
                categoryResults: null,
                offset: null
            };
        }

        return {
            ...state,
            categoryResults: action.categoryResults,
            offset: action.offset
        };
    }

    if (action.type == "GET_VENUE_DETAILS") {
        return {
            ...state,
            venueDetails: action.venueDetails
        };
    }


    return state;
}
