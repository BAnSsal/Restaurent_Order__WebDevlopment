import React from 'react';
import CartCard from './CartCard';
import Button from '@mui/material/Button';

const Cart = ({ cartItems, removeFromCart, increaseQuantity, total, handleCheckout }) => {
  console.log(cartItems);
  return (
    <div className="food-cart">
      <h3>Food Cart</h3>
      {cartItems.map((item, index) => (
        <CartCard
          key={index}
          item={item}
          removeFromCart={() => removeFromCart(index)}
          increaseQuantity={() => increaseQuantity(index)}
        />
      ))}
      <Button onClick={handleCheckout} size="medium" sx={{ textAlign: 'center', minWidth: 200 }}>Pay now ${total}</Button>
    </div>
  );
}

export default Cart;
