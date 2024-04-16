import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box, Typography } from '@mui/material';
import ProductTable from '../components/ProductosTable'; // Ensure this is the correct path


function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="filter-select-label">Seleccione una opción</InputLabel>
          <Select
            labelId="filter-select-label"
            value={filterOption}
            label="Seleccione una opción"
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="option1">Opción 1</MenuItem>
            <MenuItem value="option2">Opción 2</MenuItem>
            <MenuItem value="option3">Opción 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ProductTable searchTerm={searchTerm} filterOption={filterOption} />
    </Box>
  );
}

export default Productos;
