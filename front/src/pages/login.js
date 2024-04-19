import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/login", {
                email,
                password,
            });
            login(response.data);
            navigate("/");
        } catch (error) {
            console.error("Login error", error);
            setSnackbarMessage("Invalid credentials or server error");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setSnackbarMessage("Passwords do not match. Please try again.");
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/v1/users", {
                username: username,
                password: password,
                email: email,
                is_active: true,
                role: 'client'
            });
            if (response.data.ok) {
                setSnackbarMessage("Registration successful. Logging in...");
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                handleLogin(email, password); // Log in immediately after registering
            }
        } catch (error) {
            console.error("Registration error", error);
            setSnackbarMessage("Registration failed: " + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400, textAlign: 'center' }}>
                <CardContent>
                    <h1>{isLoginView ? 'Login' : 'Register'}</h1>

                    {isLoginView ? (
                        <>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            /><br/><br/>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            /><br/><br/>
                            <Button fullWidth onClick={() => handleLogin(email, password)} variant="contained">Login</Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}
                            /><br/><br/>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            /><br/><br/>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            /><br/><br/>
                            <TextField
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            /><br/><br/>
                            <Button fullWidth onClick={handleRegister} variant="contained">Register</Button>
                        </>
                    )}
                    <br/><br/>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={toggleView} variant="contained">
                            {isLoginView ? 'Go to Register' : 'Back to Login'}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
