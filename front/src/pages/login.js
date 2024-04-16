import React, { useState } from 'react';
import Card from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSumbit = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/login", {
                email: email,
                password: password,
            });
            login(response.data);  // Update auth context state
            navigate("/");
        } catch (error) {
            console.error("Login error", error);
            alert("Credenciales invalidas o error de servidor");
        }
    };
    
    return (
        <div>
            <Card sx={{ maxWidth: 375, margin: "auto" }}>
                <CardContent>
                    <h1>Login</h1>

                    <TextField
                    id="outlined-email-input"
                    onChange={(e) => setEmail(e.target.value)}
                    label="Correo electronico"
                    variant="outlined"
                    /><br/><br/>

                    <TextField
                    id="outlined-password-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    label="Contraseña"
                    variant="outlined"
                    /><br/><br/>
                    <Button onClick={handleSumbit} variant="contained">Ingresar</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
