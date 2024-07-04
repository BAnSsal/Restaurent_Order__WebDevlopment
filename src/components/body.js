import React from 'react';
import Grid from '@mui/material/Grid';
import FoodCard from './FoodCard.js';
import Box from '@mui/material/Box';

// Import other food images as needed
import img_location from './static/indian_dosa.jpg';
export default function FoodList({ addToCart ,foodItems}) {
 
  return (
 <Grid>  
 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>


      <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 0, sm: 0, md: 0 }}>
      {foodItems.map((foodItem, index) => (
   
          <FoodCard
            name={foodItem.name}
            category={foodItem.category}
            ingredients={foodItem.price}
            method={foodItem.ingredients}
            photo={img_location}
            id={foodItem.id}
            addToCart={addToCart}
            item={foodItem}
          />
      ))}
      </Grid>
    </Box>
    </Grid>    
  );
}
