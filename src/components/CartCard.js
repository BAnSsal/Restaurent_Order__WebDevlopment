import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import img_location from './static/indian_dosa.jpg';

const CartCard = ({ item, removeFromCart, increaseQuantity }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '10px', marginBottom: '15px', marginRight: '5px' }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 60, height: 50, marginRight: 2 }}
              image={img_location} // Assuming item.img contains the image URL
              title={item.name}
            />
          </Grid>
          <Grid item>
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity} {/* Assuming there's a quantity property in the item object */}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={removeFromCart}>-</Button>
        <Button size="small" onClick={increaseQuantity}>+</Button>
      </CardActions>
    </Card>
  );
}

export default CartCard;
