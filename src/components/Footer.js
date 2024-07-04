// Footer.js
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box maxHeight="10px"
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      < >
        <Typography  phy variant="body2" color="text.primary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Rajdhani'}
        </Typography>
      </>
    </Box>
  );
}

export default Footer;
