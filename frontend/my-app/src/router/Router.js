import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from '../container/auth/Register';
import Dashboard from '../container/dashboard/Dashboard';
import Login from '../container/auth/Login';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar';
import Home from '../component/Home';
import MyTask from '../container/myTask/MyTask';
import PrivateRouter from './PrivateRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRouter><Home /></PrivateRouter>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mytask" element={<MyTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
