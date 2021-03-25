import axios from 'axios'
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

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'

export const listProducts = (keyword="") => async (dispatch) =>{
    try {
        //calling  productReducer with product list request
        dispatch({type : PRODUCT_LIST_REQUEST})

        // getting data of all products from the backend using axios
        const {data} = await axios.get(`/api/products${keyword}`)

        //returning data to the product Reducer if no error
        dispatch({
            type : PRODUCT_LIST_SUCCESS,
            payload : data})

    } catch (error) {
        //returning PRODUCT_LIST_FAIL to the product reducer
        dispatch({
            type : PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}

export const listProductDetails = (id) => async (dispatch) =>{
    try {
        //calling  productReducer with product list request
        dispatch({type : PRODUCT_DETAILS_REQUEST})

        // getting data of the product from the backend using id
        const {data} = await axios.get(`/api/product/${id}`)

        //returning data to the product Reducer if no error
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data})

    } catch (error) {
        //returning PRODUCT_DETAILS_FAIL to the product reducer
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        //getting user info from the state
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',

                //sending authorization token in header
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        //sending request to backend to delete a product
        await axios.delete(
            `/api/products/delete/${id}`,
            config
        )

        dispatch({
            type : PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_DELETE_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}

export const createProduct = () => async(dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        //getting user info from the state
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',

                //sending authorization token in header
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        //sending request to backend to create a product
        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )

        dispatch({
            type : PRODUCT_CREATE_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_CREATE_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}

export const updateProduct = (product) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        //getting user info from the state
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',

                //sending authorization token in header
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        //sending request to backend to update a product
        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        dispatch({
            type : PRODUCT_UPDATE_SUCCESS,
            payload : data
        })
        //putting updated data in the state
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_UPDATE_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}

export const createProductReview = (productId, review) => async(dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        //getting user info from the state
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',

                //sending authorization token in header
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        //sending request to backend to create a new review
        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )

        dispatch({
            type : PRODUCT_CREATE_REVIEW_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_CREATE_REVIEW_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}