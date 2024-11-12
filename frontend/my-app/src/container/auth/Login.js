import React from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import sideImage from "./../../assets/jpg/student.jpg";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <Box className="main-container">
            <Box className="left-container">
                <Box className="form-container">
                    <Box>
                        <h1>Welcome to Demo Project</h1>
                        <p>Login to access your account</p>
                    </Box>
                    <Box className="login-form">
                        <TextField
                            className="email"
                            id="email"
                            label="Email"
                            variant="standard"
                        />
                        <TextField
                            className="password"
                            id="password"
                            label="Password"
                            variant="standard"
                            type="password"
                        />
                        <a href="#" className="forgot-password">Forgot password?</a>
                        <Box className="login-actions">
                            <Button
                                className="login-btn"
                                variant="contained"
                                size="small"
                                type="submit"
                                onClick={()=>navigate('admin/')}
                            >
                                Login
                            </Button>
                        </Box>
                        <Box className="register-actions">
                            <p>Don't have an account?</p>
                            <a
                                href=""
                                className="forgot-password"
                                onClick={() => navigate('/register')}
                            >
                                Register here
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="right-container">
                <img src={sideImage} alt="student" />
            </Box>
        </Box>
    );
}

export default Login;
