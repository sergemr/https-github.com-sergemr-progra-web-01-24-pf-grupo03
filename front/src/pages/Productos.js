import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import ProductTable from '../components/ProductosTable'; // Ensure this is the correct path

function Productos() {

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <ProductTable />
    </Box>
  );
}

export default Productos;
