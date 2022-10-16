import {
    CLEAR_LOGIN_ERRORS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST
} from "../actions/usersActions";

const initialState = {
    user: null,
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
    logoutError: null
};

const usersReducer = (state, initialState, action) => {
    switch (action.type) {
        //REGISTER

        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, user: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, loginLoading: false, loginError: action.payload};
        case CLEAR_LOGIN_ERRORS:
            return {...state, loginError: null};

        case LOGOUT_USER_REQUEST:
            return {...state, logoutLoading: true, logoutError: null};
        case LOGOUT_USER_SUCCESS:
            return {...state, logoutLoading: false, user: null};
        case LOGOUT_USER_FAILURE:
            return {...state, logoutLoading: false, logoutError: action.payload};
        default:
            return state;
    }
};

export default usersReducer;