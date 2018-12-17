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

    if (action.type == "SET_ARRAY_OF_DAYS") {
        return {
            ...state,
            arrOfDays: action.arrOfDays
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
        // if (action.categoryResults == 0) {
        //     return {
        //         ...state,
        //         categoryResults: null,
        //         offset: null
        //     };
        // }

        return {
            ...state,
            categoryResults: [...(state.categoryResults || []), ...action.categoryResults],
            offset: action.offset
        };
    }

    if (action.type=="HIDE_CATEGORY_RESULTS") {
        return {
            ...state,
            categoryResults: action.categoryResults,
            showMenu: action.showMenu
        };
    }

    if (action.type == "GET_VENUE_DETAILS") {
        return {
            ...state,
            venueDetails: action.venueDetails
        };
    }

    if (action.type == "GET_WEATHER") {
        return {
            ...state,
            weather: action.weather
        };
    }

    if (action.type == "SHOW_ADDING_MENU") {
        return {
            ...state,
            showMenu: action.showMenu
        };
    }

    if (action.type == "SET_ACTIVITY") {
        return {
            ...state,
            selectedActivity: action.selectedActivity
        };
    }

    if (action.type == "SUCCESSFULLY_ADDED") {
        return {
            ...state,
            addedActivity: action.addedActivity
        };
    }

    if (action.type == "REMOVE_DAY") {
        //here im hoping to remove the day from the array of days if it has more than 5 activities
        state = Object.assign({}, state, {
            arrOfDays: state.arrOfDays.filter(
                day => day != action.day
            )
        });
    }

    return state;
}
