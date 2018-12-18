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
            showMenu: action.showMenu,
            addingMenuName: action.addingMenuName,
            addingMenuLocation: action.addingMenuName
        };
    }

    if (action.type == "SET_ACTIVITY") {
        return {
            ...state,
            selectedActivityName: action.selectedActivityName,
            selectedActivityLocation: action.selectedActivityLocation

        };
    }

    if (action.type == "SUCCESSFULLY_ADDED") {
        return {
            ...state,
            addedActivity: action.addedActivity
        };
    }

    if (action.type == "REMOVE_DAY") {
        // here im hoping to remove the day from the array of days if it has more than 5 activities
        state = Object.assign({}, state, {
            arrOfDays: state.arrOfDays.filter(
                day => day != action.day
            )
        });

        //after filtering the array I'm also checking whether it is now empty and hide the add button then
        if (state.arrOfDays.length == 0) {
            return {
                ...state,
                showAddButton: false,
                showAddingWarningButton: true
            };
        }

    }

    if (action.type=="ADD_DAY_AGAIN") {
        //if the day has capacity and is not already in the array
        if (!state.arrOfDays.includes(action.day)) {
            state = Object.assign({}, state, {
                arrOfDays: state.arrOfDays.concat(action.day)
            });
        }

    }

    if (action.type=="HIDE_OR_SHOW_ADD_BUTTON") {
        return {
            ...state,
            showAddButton: action.showAddButton,
            showAddingWarningButton: false
        };
    }


    if (action.type == "USER_DID_SOME_WORK") {
        return {
            ...state,
            userDidSomeWork: action.userDidSomeWork
        };
    }

    if (action.type == "SET_USER_ACTIVITIES") {
        return {
            ...state,
            userActivities: action.userActivities
        };
    }

    //filter the existing array and remove whatever i removed
    if (action.type=="REMOVE_ACTIVITY") {
        state = Object.assign({}, state, {
            userActivities: state.userActivities.filter(
                activity => activity != action.activityToRemove
            )
        });
    }

    if (action.type=="SET_DELETABLE_PROPERTY_TO_FALSE") {
        state = Object.assign({}, state, {

            categoryResults: state.categoryResults.map(result => {
                if (result.name == action.resultName) {
                    return Object.assign({}, result, {deletable: false});
                } else {
                    return Object.assign({}, result);
                }
            })
        });
    }

    if (action.type=="SET_DELETABLE_PROPERTY_TO_TRUE") {
        state = Object.assign({}, state, {

            categoryResults: state.categoryResults.map(result => {
                if (result.name == action.resultName) {
                    return Object.assign({}, result, {deletable: true});
                } else {
                    return Object.assign({}, result);
                }
            })
        });
    }

    return state;
}
