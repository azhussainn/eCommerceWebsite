import { PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL,

        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,

        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,

        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_CREATE_RESET,

        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_UPDATE_RESET,

        PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAIL,
        PRODUCT_CREATE_REVIEW_RESET,

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

export const productCreateReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            //setting state to empty state
            return {loading : true}

        case PRODUCT_CREATE_SUCCESS:
            //setting state to payload
            return {loading : false,
                success:true, product:action.payload}

        case PRODUCT_CREATE_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
        }
}

export const productUpdateReducer = (state={product : {}},action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            //setting state to empty state
            return {loading : true}

        case PRODUCT_UPDATE_SUCCESS:
            //setting state to payload
            return {loading : false,
                success:true, product:action.payload}

        case PRODUCT_UPDATE_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        case PRODUCT_UPDATE_RESET:
            return {product : {}}

        default:
            return state
        }
}

export const productReviewCreateReducer = (
    state={},action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            //setting state to empty state
            return {loading : true}

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            //setting state to payload
            return {loading : false,success:true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            //setting state to error message
            return {loading : false, error : action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
        }
}