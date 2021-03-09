import { PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL
    } from '../constants/productConstants'
export const productListReducers = (state={ products:[] }, action) => {
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