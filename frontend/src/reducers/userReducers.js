import {
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,
        USER_LOGOUT
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

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}
