import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        // let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]';

        // if (signUp) {
            const authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
        // }

        axios.post(authURL, authData)
        .then(response => {
            /* if (signUp) {
                this.setState({idToken: response.data.idToken, userId: response.data.localId});
            } */
            // alert(response.data);
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch((err) => {
            // alert(err);
            console.log(err);
            dispatch(authFail(err));
        });
    };
};