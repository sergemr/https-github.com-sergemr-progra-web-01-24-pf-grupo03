import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function BoxSystemProps() {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items
  const fetchCartItems = () => {
    if (user?.user_id && token) {  // Check if user_id and token are available
      axios.get(`http://localhost:3001/api/v1/carritos/user/${user.user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.ok) {
          setCartItems(response.data.body); // Assume response.data.body is an array
        } else {
          console.error('Failed to load cart:', response.data.message);
          setCartItems([]);
        }
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setCartItems([]);
      });
    }
  };

  // Function to handle purchase finalization
  const handleFinalizarCompra = async () => {
    if (user?.user_id && token) {  // Ensure user_id and token are available
      try {
        const response = await axios.delete(`http://localhost:3001/api/v1/carritos/user/${user.user_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.ok) {
          alert('Gracias por su compra! Uno de nuestros vendedores la confirmará pronto');
          fetchCartItems();  // Fetch cart items right after finalizing the purchase
        } else {
          console.error('Failed to finalize purchase:', response.data.message);
        }
      } catch (error) {
        console.error('Error finalizing purchase:', error);
      }
    } else {
      console.error('User ID or token is not available.');
    }
  };

  // useEffect to initially fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, [user?.user_id, token]); // Dependencies array ensures fetch on user or token change

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://images5.alphacoders.com/321/321887.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        height={700}
        width={1000}
        my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        p={3}
        sx={{ border: '6px solid grey', ml: 30, overflow: 'auto' }}
      >
        <ShoppingCartIcon style={{ fontSize: 50 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="shopping cart">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Imagen</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem) => cartItem.products.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell component="th" scope="row">{product.name}</TableCell>
                  <TableCell align="right">
                    <img src={product.image_uris && product.image_uris.small} alt={product.name} style={{ width: '50px' }} />
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button variant="contained" style={{ marginTop: 620, marginLeft: -360 }} onClick={handleFinalizarCompra}>Finalizar compra</Button>
    </div>
  );
}
