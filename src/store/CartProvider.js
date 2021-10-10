import React from 'react';
import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0
};

const cartReducer = (state, action) =>{
    if(action.type === 'ADD_TO_CART'){
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        )
        let updatedItem;
        let updatedItems;
        if(existingItemIndex !== -1){
            const existingCartItem = state.items[existingItemIndex];
            updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    else if(action.type === 'REMOVE_FROM_CART'){
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id
        )
        const existingCartItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount > 1){
            let updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        else{
            updatedItems = [...state.items];
            updatedItems.splice(existingItemIndex,1);
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    else{
        return defaultCartState;
    }
};

const CartProvider = (props)=>{

    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    
    const addItemsToCartHandler = (item)=>{
        dispatchCartAction({
            type:'ADD_TO_CART',
            item:item
        })
    }
    
    const removeItemsToCartHandler = (id)=>{
        dispatchCartAction({
            type:'REMOVE_FROM_CART',
            id:id
        })
    }
    
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemsToCartHandler,
        removeItem:removeItemsToCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;