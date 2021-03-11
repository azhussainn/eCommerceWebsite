import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async(dispatch, getState) =>{

    //making api call to get product data
    const {data} = await axios.get(`/api/products/${id}`)


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