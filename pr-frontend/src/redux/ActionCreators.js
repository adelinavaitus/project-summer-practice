import * as ActionTypes from './ActionTypes'; // Import action types
import axios from 'axios';  // Import axios for making HTTP requests

// Action to handle login form submission
export const postFormLogin = (data) => (dispatch) => {
  axios
    .post("/login", data) // Send POST request to login endpoint with the provided data
    .then((res) => {
      localStorage.setItem("token", res.data.accessToken);   // Save the received token in localStorage
      return res.data;  // Return the response data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_LOGIN_SUCCESS,  // Dispatch success action with the result
        payload: result,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.POST_LOGIN_FAILURE, // Dispatch failure action if there's an error
        payload: err.code,
      })
    )
};

// Action to handle company registration form submission
export const postFormRegisterCompany = (data) => (dispatch) => {
  axios
    .post(`/register-company`, data)   // Send POST request to register company endpoint
    .then((res) => {
      return res.data;  // Return the response data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_SUCCESS,  // Dispatch success action with the result
        payload: result,
      })
    )
    .then(() => {
      window.location.href= "/login"   // Redirect to login page after successful registration
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_FAILURE,   // Dispatch failure action if there's an error
        payload: err.response.data.message,
      })
    });
};

// Action to handle student registration form submission
export const postFormRegisterStudent = (data) => (dispatch) => {
  axios
    .post(`/register-student`, data)   // Send POST request to register student endpoint
    .then((res) => {
      return res.data;  // Return the response data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_STUDENT_SUCCESS,   // Dispatch success action with the result
        payload: result,
      })
    )
    .then(() => {
      window.location.href= "/login"   // Redirect to login page after successful registration
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_STUDENT_FAILURE,  // Dispatch failure action if there's an error
        payload: err.response.data.message,
      })
    });
};

// Action to handle supervisor registration form submission
export const postFormRegisterSupervisor = (data) => (dispatch) => {
  axios
    .post(`/register-supervisor`, data)  // Send POST request to register supervisor endpoint
    .then((res) => {  
      return res.data;   // Return the response data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_SUPERVISOR_SUCCESS,  // Dispatch success action with the result
        payload: result,
      })
    )
    .then(() => {
      window.location.reload(); // Reload the page after successful registration
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_SUPERVISOR_FAILURE, // Dispatch failure action if there's an error
        payload: err.response.data.message,
      })
    });
};

// Action to handle user logout
export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",  // Dispatch logout action
  };
};

// Action to fetch list of faculties
export const fetchFaculties = () => (dispatch) => {
  axios.get(`http://localhost:8080/faculties`)  // Send GET request to fetch faculties data
    .then(res => {
      return res.data // Return the response data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.FETCH_FACULTIES,  // Dispatch action with the faculties data
        payload: result,
      })).catch(err => {
        console.log(err); // Log any errors that occur during the request
      })
}

// Action to trigger page reload
export const ReloadPage = () => {
  return{
    type: ActionTypes.RELOAD_PAGE,  // Dispatch reload action
  };
}
