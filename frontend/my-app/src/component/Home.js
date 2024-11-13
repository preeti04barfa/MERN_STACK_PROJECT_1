import React from 'react'
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import "./Home.css";
import Header from './Header';


const Home = () => {
  return (
    <>
      <Box className="header-main"><Header /></Box>
      <Box className="main-sidebar">
        <Box>
          <Sidebar />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default Home
