import React, { createContext, useReducer, useContext } from "react";

// Create contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function (you can fill in the logic as needed)
const reducer = (state, action) => {
  // Implement your reducer logic here
  switch(action.type) {
    // Add your cases here
    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks for using the context
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
