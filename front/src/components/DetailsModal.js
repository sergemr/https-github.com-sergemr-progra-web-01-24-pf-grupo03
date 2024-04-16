import React from 'react';
import { Modal, Box, Typography, Grid, Paper } from '@mui/material';

function DetailsModal({ open, handleClose, product }) {
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
              Type: {product.typeLine}
              <br />
              Set Name: {product.setName}
              <br />
              Rarity: {product.rarity}
              <br />
              Price: {product.price ? `$${product.price.toFixed(2)} USD` : 'N/A'}
              <br />
              Quantity: {product.quantity}
              <br />
              In Stock: {product.inStock ? 'Yes' : 'No'}
            </Typography>
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
