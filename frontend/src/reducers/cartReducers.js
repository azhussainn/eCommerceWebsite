import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems : []},
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

                    default:
                        return state
                }
            }