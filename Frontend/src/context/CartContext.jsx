import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const products = localStorage.getItem("cart");
    if (products) setCartItem(JSON.parse(products));
  }, []);

  return (
    <CartContext.Provider value={[cartItem, setCartItem]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
