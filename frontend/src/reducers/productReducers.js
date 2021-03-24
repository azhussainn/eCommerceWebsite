import { PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL,

        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,

        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,

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


export const productDeleteReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            //setting state to empty state
            return {loading : true}

        case PRODUCT_DELETE_SUCCESS:
            //setting state to payload
            return {loading : false, success:true}

        case PRODUCT_DELETE_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        default:
            return state
        }
}
