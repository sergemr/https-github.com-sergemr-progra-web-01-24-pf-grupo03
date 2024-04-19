import React from 'react';
import { Modal, Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import the authentication context
import axios from 'axios';

function DetailsModal({ open, handleClose, product }) {
const { user, token } = useAuth();

const addToCarrito = async () => {
  console.log('User object:', user); // Log the entire user object for debugging
  console.log('User ID:', user?.user_id); // Debugging to ensure you have the user ID

  if (!user?.user_id) {
      console.error('No user ID available');
      return; // Exit the function if no user ID is available
  }

  // Prepare a payload that includes detailed product information
  const payload = {
      user_id: user.user_id,
      products: [{  // Switch from product_ids to products array including details
          product_id: product.id,
          name: product.name,
          mana_cost: product.mana_cost,
          cmc: product.cmc,
          type_line: product.type_line,
          oracle_text: product.oracle_text,
          colors: product.colors,
          color_identity: product.color_identity,
          set_name: product.set_name,
          set: product.set,
          rarity: product.rarity,
          image_uris: product.image_uris,
          price: product.prices ? `${product.prices.toFixed(2)} USD` : 'N/A',
          quantity: product.quantity, // Consider if you want to adjust quantity here or elsewhere
          inStock: product.inStock
      }]
  };

  try {
      const response = await axios.post('http://localhost:3001/api/v1/carritos', payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Use the destructured token here
          }
      });
      if (response.data.ok) {
          console.log('Product added to carrito successfully');
          handleClose(); // Optionally close the modal on success
      } else {
          throw new Error(response.data.message || 'Failed to add product to carrito');
      }
  } catch (error) {
      console.error('Error adding product to carrito:', error);
  }
};

  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-details-modal"
      aria-describedby="product-details"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', // Set the width of the modal
        maxHeight: '70vh', // Set the maximum height of the modal
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {product.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Mana Cost: {product.mana_cost}
              <br />
              Type: {product.type_line}
              <br />
              Set Name: {product.set_name}
              <br />
              Rarity: {product.rarity}
              <br />
              Price: {product.price ? `$${product.price.toFixed(2)} USD` : 'N/A'}
              <br />
              Quantity: {product.quantity}
              <br />
              In Stock: {product.inStock ? 'Yes' : 'No'}
            </Typography>
            {user && ( // Conditionally render the button if the user is logged in
              <Button variant="contained" onClick={addToCarrito} sx={{ mt: 2 }}>
                Enviar a Carrito
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={4} sx={{ maxWidth: 345, p: 1 }}>
              <img src={product.image_uris && product.image_uris.border_crop} alt={product.name} style={{ width: '100%' }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DetailsModal;
