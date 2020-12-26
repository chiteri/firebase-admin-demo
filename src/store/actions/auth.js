import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, userEmail) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userEmail: userEmail
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // We are not logged in any more, get rid of session data
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    localStorage.removeItem('userEmail');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); 
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';

        if (isSignUp) {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
        }

        axios.post(authURL, authData)
        .then(response => {
            // console.log(response);
            // Keep the token, userId and expiration time in local storage to persist session
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', response.data.localId);
            localStorage.setItem('userEmail', response.data.email);

            dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((err) => {
            // alert(err);
            // console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate < new Date()) {
                // Token should be expired
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userID');
                const userEmail = localStorage.getItem('userEmail');
                dispatch(authSuccess(token, userId, userEmail));
                dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
            }
        }
    }
}