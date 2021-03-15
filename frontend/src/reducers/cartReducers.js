import { CART_ADD_ITEM,
     CART_REMOVE_ITEM,
     CART_SAVE_SHIPPING_ADDRESS,
     CART_SAVE_PAYMENT_METHOD,
     CART_CLEAR_ITEMS
     } from '../constants/cartConstants'


export const cartReducer = (state = {cartItems : [], shippingAddress : {}},
            action) => {
                switch(action.type){

                    case CART_ADD_ITEM:
                        const item = action.payload
                        const existItem = state.cartItems.find(
                            x => x.product === item.product)

                        //if the same product already exists in cart
                        // then update it
                        if(existItem){

                            return {
                                ...state, cartItems : state.cartItems.map(
                                    x => x.product === existItem.product
                                     ? item : x
                                )
                            }
                        //if the same product does not exist in cart
                        //add it to the cart
                        }else{
                            return {
                                ...state,
                                cartItems : [...state.cartItems, item]
                            }
                        }

                    case CART_REMOVE_ITEM:
                        return {
                            ...state,
                            cartItems : state.cartItems.filter(x => x.product !== action.payload)
                        }


                    //returning state and shipping address from form data
                    case CART_SAVE_SHIPPING_ADDRESS:
                        return {
                            ...state,
                            shippingAddress : action.payload
                        }

                    //setting payment method received from the action
                    case CART_SAVE_PAYMENT_METHOD:
                        return {
                            ...state,
                            paymentMethod : action.payload
                        }

                    case CART_CLEAR_ITEMS:
                        return {
                            ...state,
                            cartItems : []
                        }


                    default:
                        return state
                }
            }