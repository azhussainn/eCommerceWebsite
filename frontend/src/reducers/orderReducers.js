import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
}
    from '../constants/orderConstants'

export const orderCreateReducer = (state={}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading : true}

        case ORDER_CREATE_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                success:true,
                order:action.payload
                }

        case ORDER_CREATE_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        case ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const orderDetailsReducer = (state=
    {
        loading:true,
        orderItems: [],
        shippingAddress : {} 
    }, action) => {

    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading : true
            }

        case ORDER_DETAILS_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                order:action.payload
                }

        case ORDER_DETAILS_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        default:
            return state
    }
}

export const orderPayReducer = (state=
    {}, action) => {

    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {
                loading : true
            }

        case ORDER_PAY_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                success : true
                }

        case ORDER_PAY_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        case ORDER_PAY_RESET:
            //setting state to empty
            return {}

        default:
            return state
    }
}


export const orderListMyReducer = (
    state={orders:[]}, action) => {

    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return {
                loading : true
            }

        case ORDER_LIST_MY_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                orders : action.payload
                }

        case ORDER_LIST_MY_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        case ORDER_LIST_MY_RESET:
            //removing all orders from state
            return {orders :[]}

        default:
            return state
    }
}


export const orderListReducer = (
    state={orders:[]}, action) => {

    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {
                loading : true
            }

        case ORDER_LIST_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                orders : action.payload
                }

        case ORDER_LIST_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        default:
            return state
    }
}

export const orderDeliverReducer = (state=
    {}, action) => {

    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {
                loading : true
            }

        case ORDER_DELIVER_SUCCESS:
            //setting state to payload
            return {
                loading : false,
                success : true
                }

        case ORDER_DELIVER_FAIL:
            //setting state to error message
            return {loading : false,
                 error : action.payload}

        case ORDER_DELIVER_RESET:
            //setting state to empty
            return {}

        default:
            return state
    }
}