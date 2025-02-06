import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const postFormLogin = (data) => (dispatch) => {
  axios
    .post("/login", data)
    .then((res) => {
      localStorage.setItem("token", res.data.accessToken);
      return res.data;
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_LOGIN_SUCCESS,
        payload: result,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.POST_LOGIN_FAILURE,
        payload: err.code,
      })
    )
    
};

export const postFormRegisterCompany = (data) => (dispatch) => {
  axios
    .post(`/register-company`, data)
    .then((res) => {
      return res.data;
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_SUCCESS,
        payload: result,
      })
    )
    .then(() => {
      window.location.href= "/login"
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_FAILURE,
        payload: err.response.data.message,
      })

    });



};

export const postFormRegisterStudent = (data) => (dispatch) => {
  axios
    .post(`/register-student`, data)
    .then((res) => {
      return res.data;
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_STUDENT_SUCCESS,
        payload: result,
      })
    )
    .then(() => {
      window.location.href= "/login"
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_STUDENT_FAILURE,
        payload: err.response.data.message,
      })
    });

};

export const postFormRegisterSupervisor = (data) => (dispatch) => {
  axios
    .post(`/register-supervisor`, data)
    .then((res) => {
      return res.data;
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.POST_REGISTER_SUPERVISOR_SUCCESS,
        payload: result,
      })
    )
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.POST_REGISTER_SUPERVISOR_FAILURE,
        payload: err.response.data.message,
      })
    });

};


export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const fetchFaculties = () => (dispatch) => {
  axios.get(`http://localhost:8080/faculties`)
    .then(res => {
      // console.log(res.data);
      return res.data
    })
    .then((result) =>
      dispatch({
        type: ActionTypes.FETCH_FACULTIES,
        payload: result,
      })).catch(err => {
        console.log(err);
      })
}

export const ReloadPage = () => {
  return{
    type: ActionTypes.RELOAD_PAGE,
  };
}

