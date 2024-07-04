import React from 'react';
import { Button, TextField, Typography } from '@mui/material';

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Hello, Material-UI!</Typography>
      <TextField label="Username" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
}

export default MyComponent;