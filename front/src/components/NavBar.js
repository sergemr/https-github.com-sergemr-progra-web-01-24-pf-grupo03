import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';


function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Navbar user:", user);  // Add this line to debug

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleProductosClick = () => {
    navigate("/Productos");
  };

  const handleCarritoClick = () => {
    navigate("/carrito");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AviD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="Productos"
              onClick={handleProductosClick}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Productos
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && (
              <IconButton
                onClick={handleCarritoClick}
                sx={{ color: 'white' }}
                aria-label="Carrito"
              >
                <ShoppingCartIcon />
              </IconButton>
            )}
            {user ? (
              <Button onClick={handleLogoutClick} sx={{ my: 2, color: 'white' }}>Logout</Button>
            ) : (
              <Button onClick={handleLoginClick} sx={{ my: 2, color: 'white' }}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
