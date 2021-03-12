import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'
import { CART_REMOVE_ITEM } from '../constants/cartConstants'

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