import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL }
    from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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

        //sending request to backend to create an order
        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data
        })

        dispatch({
            type : CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type : ORDER_CREATE_FAIL,
            payload : error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
    }
}