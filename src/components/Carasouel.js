// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

const images = [
  'https://via.placeholder.com/800x400?text=Slide+1',
  'https://via.placeholder.com/800x400?text=Slide+2',
  'https://via.placeholder.com/800x400?text=Slide+3',
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto', my: 4 }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
