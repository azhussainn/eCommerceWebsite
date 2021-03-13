import {
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,

        USER_LOGOUT,

        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL
     } from '../constants/userConstants'


export const userLoginReducer = (state= { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:

            //setting state to empty list
            return {loading : true}

        case USER_LOGIN_SUCCESS:
            //setting state to payload
            return {loading : false, userInfo : action.payload}

        case USER_LOGIN_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        //clearing the state
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state= { }, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:

            //setting state to empty list
            return {loading : true}

        case USER_REGISTER_SUCCESS:
            //setting state to payload
            return {loading : false, userInfo : action.payload}

        case USER_REGISTER_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        //clearing the state
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}