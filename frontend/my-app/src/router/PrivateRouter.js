import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const getToken = localStorage.getItem('userToken');
  return getToken ? children : <Navigate to="/" />;
};

export default PrivateRouter;
