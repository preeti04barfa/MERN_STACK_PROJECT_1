import React from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import avtar from "../assets/png/avtar1.jpg";
import "./Header.css"

const Header = () => {

  return (
    <Box className="main-header">
      <Box className="icons">
     
        <Box className="user-profile">
          <h3 className='welcome'>Welcome!</h3>
          <h3 className='user-name'>{"Preeti"}</h3>
          <img src={avtar} alt="avatar" className="avatar-img"></img>
        </Box>
        <Box>
          <Link to="/">
            <button className="login" >
              <h3>LogOut</h3>
            </button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
