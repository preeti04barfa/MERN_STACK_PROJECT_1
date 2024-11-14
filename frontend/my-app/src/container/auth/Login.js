import React, { useState } from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import sideImage from "./../../assets/jpg/student.jpg";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Api } from '../../config/Api';
import { toast } from "react-toastify";
import { DataService } from '../../config/DataService';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleFormSubmit = async (values) => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const response = await DataService.post(Api.LOGIN_USER, formData);
      const userData = response.data.data;
      const userToken = userData.token;
      const userRefreshToken = userData.refreshToken;

      localStorage.setItem('userToken', userToken);
      localStorage.setItem('userRefreshToken', userRefreshToken);
      toast.success(response.data.message);
      navigate("admin/");

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Box className="main-container">
      <Box className="left-container">
        <Box className="form-container">
          <Box>
            <h1>Welcome to Demo Project</h1>
            <p>Login to access your account</p>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <Form className="login-form">
                <Box>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    className="email"
                  />
                </Box>

                <Box>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    className="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <a href="#" className="forgot-password">Forgot password?</a>

                <Box className="login-actions">
                  <Button
                    className="login-btn"
                    variant="contained"
                    size="small"
                    type="submit"
                  >
                    Login
                  </Button>
                </Box>

                <Box className="register-actions">
                  <p>Don't have an account?</p>
                  <a
                    href="#"
                    className="forgot-password"
                    onClick={() => navigate('/register')}
                  >
                    Register here
                  </a>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Box className="right-container">
        <img src={sideImage} alt="student" />
      </Box>
    </Box>
  );
}

export default Login;
