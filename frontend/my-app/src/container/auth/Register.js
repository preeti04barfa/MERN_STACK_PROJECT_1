import React from 'react'
import "./Register.css"
import Box from '@mui/material/Box';
import sideImage from "./../../assets/jpg/student.jpg"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    return (
        <Box className="main-container">
            <Box className="left-container">
                <Box className="form-container">
                    <Box><h1>Welcome to Demo Project</h1>
                        </Box>
                    <Box className="register-form">
                   
                             <TextField
                            className="email"
                            id="email"
                            label="Name"
                            variant="standard"
                        />
                              <TextField
                            className="email"
                            id="email"
                            label="Number"
                            variant="standard"
                        />
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

                        <Box className="register-actions">
                            <Button
                                className="login-btn"
                                variant="contained"
                                size="small"
                                type="submit"
                            >
                                Register
                            </Button>
                          
                        </Box>
                        <Box className="register-actions">
                           
                          <p>already have an account? </p>
                          <a
                                href=""
                                className="forgot-password"
                                onClick={() => navigate('/')}
                            >
                                login here
                            </a>
                        </Box>
                    </Box>
                    <Box></Box>

                </Box>
            </Box>
            <Box className="right-continer">
                <img src={sideImage} alt="student" />

            </Box>
        </Box>
    )
}

export default Register
