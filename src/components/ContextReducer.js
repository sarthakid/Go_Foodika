import React, { act, children, useReducer } from 'react'
import { createContext, useContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name, price: action.price, size:action.size, qty: action.qty, img: action.img}];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state]
            arr.find((Food, index) => {
                if (Food.id === action.id) {
                    console.log(Food.qty, parseInt(action.qty), action.price + Food.price)
                arr[index] = { ...Food, qty: parseInt(action.qty) + Food.qty, price: action.price + Food.price }
                }
                return arr
            })
            return arr
            case "DROP":
                let empArray = []
                return empArray

        default:
            console.log("error in Reducer");
    }
 
};

export const CartProvider = ({children}) => {


    const [state,dispatch] = useReducer(reducer,[])


    return (

        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
           );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);



