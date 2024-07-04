import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '10vh' }}>
      <div>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ width: 250 }}>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            aria-labelledby="price-range-slider"
          />
        </Box>
      </div>
    </div>
  );
}
