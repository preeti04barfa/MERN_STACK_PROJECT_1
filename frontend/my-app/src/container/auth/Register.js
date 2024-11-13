import React, { useState } from 'react';
import "./Register.css";
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import sideImage from "./../../assets/jpg/student.jpg";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';
import { DataService } from '../../config/DataService';
import { Api } from '../../config/Api';

const Register = () => {
  const navigate = useNavigate();

    let initialValues={
        name: '',
        number: '',
        email: '',
        password: ''
      }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(20, 'Name must be at most 20 characters')
      .required('Name is required'),
    number: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .min(8, 'Email must be at least 8 characters')
      .max(30, 'Email must be at most 30 characters')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(10, 'Password must be at most 10 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
      .required('Password is required')
  });

  const handleFormSubmit = async (values) => {
    try {
        const formData = new URLSearchParams();
        formData.append("name", values.name);
        formData.append("number", values.number);
        formData.append("email", values.email);
        formData.append("password", values.password);

        const response = await DataService.post(Api.REGISTER_USER, formData);
        const userData = response.data.data;
console.log(response.data,"serData");

        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success(response.data.message);
        navigate('/');

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
          </Box>

          <Formik
          initialValues = {initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        
          >
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <Form className="register-form">
                <Box>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    variant="standard"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    className="email"
                  />
                </Box>

                <Box>
                  <Field
                    as={TextField}
                    name="number"
                    label="Number"
                    variant="standard"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.number && Boolean(errors.number)}
                    helperText={touched.number && errors.number}
                    className="email"
                  />
                </Box>

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
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    className="password"
                  />
                </Box>

                <Box className="register-actions">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="login-btn"
                  >
                    Register
                  </Button>
                </Box>

                <Box className="register-actions">
                  <p>Already have an account?</p>
                  <a
                    href="#"
                    className="forgot-password"
                    onClick={() => navigate('/')}
                  >
                    Login here
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
};

export default Register;
