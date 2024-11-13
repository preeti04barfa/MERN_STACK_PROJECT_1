import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import "./Sidebar.css"

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Box className="sidebar-main">
            <Box className="side-bar">
            {/* <Box className="logo"><h2>Demo</h2></Box> */}
                <Box
                    className="dashboard-text"
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ cursor: 'pointer' }}
                >
                    <DashboardIcon className="icon" /> Dashboard
                </Box>
                <Box
                    className="task-text"
                    onClick={() => navigate('/admin/MyTask')}
                    style={{ cursor: 'pointer' }}
                >
                 <TaskIcon  className="icon"/> My Task 
                </Box>
             
            </Box>
        </Box>
    );
};

export default Sidebar;
