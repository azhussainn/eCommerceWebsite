import axios from 'axios'
import { PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) =>{
    try {
        //calling  productReducer with product list request
        dispatch({type : PRODUCT_LIST_REQUEST})

        // getting data of all products from the backend using axios
        const {data} = await axios.get('/api/products/')

        //returning data to the product Reducer if no error
        dispatch({
            type : PRODUCT_LIST_SUCCESS,
            payload : data})

    } catch (error) {
        //returning PRODUCT_LIST_FAIL to the product reducer
        dispatch({
            type : PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
}