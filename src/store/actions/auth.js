import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
};

export const auth = (email , password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        const key = process.env.REACT_APP_API_KEY;
        //console.log(process.env);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key;
        }
        axios.post(url,
        authData).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    }
};