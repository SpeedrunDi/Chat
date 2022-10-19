import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

const getUsersRequest = () => ({type: GET_USERS_REQUEST});
const getUsersSuccess = users => ({type: GET_USERS_SUCCESS, payload: users});
const getUsersFailure = error => ({type: GET_USERS_FAILURE, payload: error});

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});

const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
const logoutUserFailure = error => ({type: LOGOUT_USER_FAILURE, payload: error});

export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
        dispatch(getUsersRequest());

        const token = getState().users.user.token;
        const headers = {'Authorization': token};

        const {data} = await axiosApi('/users', {headers});

        dispatch(getUsersSuccess(data));
    }  catch (e) {
        dispatch(getUsersFailure(e));
    }
  };
};

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', userData);

            dispatch(registerUserSuccess(response.data));
            toast.success('You have successfully registered!');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
            throw e;
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const {data} = await axiosApi.post('/users/sessions', userData);

            dispatch(loginUserSuccess(data.user));
            dispatch(historyPush('/'));

            toast.success('Login successful!');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
            throw e;
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(logoutUserRequest());
            const token = getState().users.user.token;
            const headers = {'Authorization': token};

            await axiosApi.delete('/users/sessions', {headers});

            dispatch(logoutUserSuccess());
            dispatch(historyPush('/login'));
        } catch (e) {
            dispatch(logoutUserFailure(e));
        }
    };
};