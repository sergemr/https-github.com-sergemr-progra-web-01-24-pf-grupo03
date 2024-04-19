import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Hero from './components/LandingPage';
import Productos from './pages/Productos'; 
import Carrito from './pages/Carrito'; 
import Login from './pages/login';
import theme from './theme';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router> {/* Wrap your components with Router */}
          <NavBar />
          <Routes> {/* Define your routes within Routes */}
            <Route path="/" element={<Hero />} /> {/* Default path for home */}
            <Route path="/productos" element={<Productos />} /> {/* Path for Productos */}
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Carrito />} />
            {/* Add more Route components for additional paths as needed */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
