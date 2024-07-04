import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function CartButton({ handleOpenCart }) {
  return (
    <IconButton color="inherit" onClick={handleOpenCart}>
      <Badge  color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartButton;
