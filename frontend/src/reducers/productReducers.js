import { PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL,

        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL

    } from '../constants/productConstants'
export const productListReducer = (state={ products:[] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:

            //setting state to empty list
            return {loading : true, products : []}

        case PRODUCT_LIST_SUCCESS:
            //setting state to payload
            return {loading : false, products : action.payload}

        case PRODUCT_LIST_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        default:
            return state
    }
}

export const productDetailsReducer = (state={
                product: {reviews : [] }},action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:

            //setting state to empty state
            return {loading : true, ...state}

        case PRODUCT_DETAILS_SUCCESS:
            //setting state to payload
            return {loading : false, product : action.payload}

        case PRODUCT_DETAILS_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        default:
            return state
    }
}