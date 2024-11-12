import React from 'react'
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <>
    <Box className="main-sidebar">
    <Box>
      <Sidebar/>
    </Box>
    <Box>
        <Outlet/>
    </Box>
    </Box>
    </>
  )
}

export default Home
