import axios from 'axios'
import {
    CART_ADD_ITEM ,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD  } from '../constants/cartConstants'

export const addToCart = (id, qty) => async(dispatch, getState) =>{

    //making api call to get product data
    const {data} = await axios.get(`/api/product/${id}`)


    //updating the state
    dispatch({
        type : CART_ADD_ITEM,
        payload : {
            product : data._id,
            name :data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    //setting product data in local storage
    localStorage.setItem('cartItems',
         JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (
    dispatch, getState) => {

        //dispatching to cart Reducer -> CART_REMOVE_ITEM
        dispatch({
            type : CART_REMOVE_ITEM,
            payload :  id
        })

    //setting product data in local storage
    //doing this would clear the item from local storage
    localStorage.setItem('cartItems',
    JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (
    dispatch) => {

        dispatch({
            type : CART_SAVE_SHIPPING_ADDRESS,
            payload :  data
        })

    //saving shipping Address in local storage
    localStorage.setItem('shippingAddress',
    JSON.stringify(data))
}

export const savePaymentMethod = (data) => (
    dispatch) => {

        //sending payment method data to reducer
        dispatch({
            type : CART_SAVE_PAYMENT_METHOD,
            payload :  data
        })

    //saving payment Method in local storage
    localStorage.setItem('paymentMethod',
    JSON.stringify(data))
}