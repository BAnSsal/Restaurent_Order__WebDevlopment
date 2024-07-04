import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Typography } from '@mui/material';

const CartPortal = ({ isOpen, onClose, cartItems, removeFromCart, increaseQuantity, total, checkout, handleMyOrder }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 600,
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: 24,
        zIndex: 1300, // Ensure it appears above other MUI components
        p: 2,
        overflowY: 'auto', // Add scroll if cart items exceed height
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Box sx={{ display: 'flex' }}>
          <Button onClick={handleMyOrder} sx={{ ml: 2 }}>My Orders</Button>
          <Button onClick={checkout} sx={{ ml: 2 }}>Buy Now</Button>
        </Box>
      </Box>
      
      <Typography variant="h6">Cart Items</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box>
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
              <Button onClick={() => increaseQuantity(index)} sx={{ mr: 1 }}>Increase</Button>
              <Button onClick={() => removeFromCart(index)}>Remove</Button>
            </Box>
          ))}
        </Box>
      )}
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
    </Box>,
    document.body
  );
};

export default CartPortal;
