import * as ActionTypes from './ActionTypes';


const initialState = {
    isLoggedIn: false,
    userLogin: {},
    isRegistered: false,
    faculties: [],
    err_login: false,
    err_register_comp: "",
    err_register_stud: "",

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.POST_LOGIN_SUCCESS:
            return {
                ...state,
                userLogin: action.payload,
                isLoggedIn: true,
                err_login: false
            };
        case ActionTypes.POST_LOGIN_FAILURE:
            return {
                ...state,
                userLogin: action.payload,
                err_login: true
            }
        case ActionTypes.POST_REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true,
                err_register_comp: ""
            }
        case ActionTypes.POST_REGISTER_STUDENT_SUCCESS:
            return {
                ...state,
                isRegistered: true,
                err_register_stud: ""

            }
        case ActionTypes.POST_REGISTER_FAILURE:
            return {
                ...state,
                err_register_comp: action.payload
            }
        case ActionTypes.POST_REGISTER_STUDENT_FAILURE:
            return {
                ...state,
                err_register_stud: action.payload
            }
        case ActionTypes.POST_REGISTER_SUPERVISOR_SUCCESS:
            return {
                ...state,
                isRegistered: true,

            }
        case ActionTypes.POST_REGISTER_SUPERVISOR_FAILURE:
            return {
                ...state,
            }

        case ActionTypes.LOGOUT_USER:
            return {
                ...state,
                userLogin: null,
                isLoggedIn: false
            }
        case ActionTypes.FETCH_FACULTIES:
            return {
                ...state,
                faculties: action.payload
            }
        case ActionTypes.RELOAD_PAGE:
            return {
                ...state,
                err_register_comp: "",
                err_register_stud: "",
                err_login: false
            }

        default:
            return state;
    }
}



