import React, { Children, createContext, useContext, useReducer } from 'react';
// import { create } from '../../back-end/models/User';r

const cartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
            case "UPDATE":
            let arr = [...state]
            arr.find((food,index)=>{
                 if(food.if === action.id){
                    console.log(food.qty,parseInt(action.qty), action.price + food.price)
                    arr[index] = {...food, qty:parseInt(action.qty) + food.qty,price:action.price + food.price}
                 }
                 return arr
            })
            return arr
        default:
            console.log("Error in context ")
    }
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

export default CartProvider;
export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);