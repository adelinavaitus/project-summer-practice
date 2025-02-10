import * as ActionTypes from './ActionTypes';    // Import action types

// Initial state of the Redux store
const initialState = {
    isLoggedIn: false, // Indicates if the user is logged in
    userLogin: {}, // Holds user login data
    isRegistered: false, // Indicates if the user is successfully registered
    faculties: [], // List of faculties fetched from the server
    err_login: false, // Holds login error status
    err_register_comp: "", // Holds company registration error message
    err_register_stud: "", // Holds student registration error message
}

// Reducer function to handle different actions and update the state
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.POST_LOGIN_SUCCESS:    // Action when login is successful
            return {
                ...state,
                userLogin: action.payload, // Store user login data
                isLoggedIn: true, // Mark user as logged in
                err_login: false // Clear login error
            };
        case ActionTypes.POST_LOGIN_FAILURE:     // Action when login fails
            return {
                ...state,
                userLogin: action.payload,  // Store the error payload
                err_login: true // Set login error flag
            }
        case ActionTypes.POST_REGISTER_SUCCESS: // Action when company registration is successful
            return {
                ...state,
                isRegistered: true, // Mark user as registered
                err_register_comp: ""   // Clear company registration error
            }
        case ActionTypes.POST_REGISTER_STUDENT_SUCCESS: // Action when student registration is successful
            return {
                ...state,
                isRegistered: true, // Mark user as registered
                err_register_stud: ""   // Clear student registration error

            }
        case ActionTypes.POST_REGISTER_FAILURE:  // Action when company registration fails
            return {
                ...state,
                err_register_comp: action.payload   // Set company registration error message
            }
        case ActionTypes.POST_REGISTER_STUDENT_FAILURE: // Action when student registration fails
            return {
                ...state,
                err_register_stud: action.payload    // Set student registration error message
            }
        case ActionTypes.POST_REGISTER_SUPERVISOR_SUCCESS:  // Action when supervisor registration is successful
            return {
                ...state,
                isRegistered: true, // Mark user as registered

            }
        case ActionTypes.POST_REGISTER_SUPERVISOR_FAILURE:  // Action when supervisor registration fails
            return {
                ...state,
                // No specific changes on failure for supervisor registration
            }

        case ActionTypes.LOGOUT_USER:   // Action when user logs out
            return {
                ...state,
                userLogin: null, // Clear user login data
                isLoggedIn: false // Mark user as logged out
            }
        case ActionTypes.FETCH_FACULTIES:    // Action to set fetched list of faculties
            return {
                ...state,
                faculties: action.payload   // Update faculties data
            }
        case ActionTypes.RELOAD_PAGE:   // Action to reset errors when page reloads
            return {
                ...state,
                err_register_comp: "", // Clear company registration error
                err_register_stud: "", // Clear student registration error
                err_login: false // Clear login error
            }
        default:     // Return current state if no matching action is found
            return state;
    }
}