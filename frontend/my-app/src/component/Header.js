import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import avtar from "../assets/png/avtar1.jpg";
import "./Header.css"
import { useNavigate } from 'react-router-dom';
import { DataService } from '../config/DataService';
import { Api } from '../config/Api';
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getToken = localStorage.getItem('userToken');
    if (getToken) {
      fetchUserData(getToken); 
    }
  }, []);


  const fetchUserData = async (token) => {
    try {
      const response = await DataService.get(Api.GET_SINGLE_USER, {
        headers: {
          'auth': token,
        },
      });

      const userDataCredential = response.data.data;
      localStorage.setItem('userDataCredential', JSON.stringify(userDataCredential));

      setName(userDataCredential.name);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken(); 
      } else {
        toast.error(error.response ? error.response.data.message : "An unexpected error occurred");
      }
    }
  };


  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('userRefreshToken');
    if (!refreshToken) {
      toast.error("No refresh token found.");
      return;
    }

    try {
      const response = await DataService.post(Api.REFRESH_TOKEN, {
        refreshToken: refreshToken
      });

      const userData = response.data.data;
      localStorage.setItem('userToken', userData.token); 

      fetchUserData(userData.token);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An unexpected error occurred");
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem('userToken');
    navigate("/");
  };

  return (
    <Box className="main-header">
      <Box className="logoname"><h1>Demo</h1></Box>
      <Box className="icons">
        <Box className="user-profile">
          <h3 className='welcome'>Welcome!</h3>
          <h3 className='user-name'>{name}</h3>
          <img src={avtar} alt="avatar" className="avatar-img"></img>
        </Box>
        <Box>
          <Link to="/">
            <button className="login" onClick={handleSubmit}>
              <h3>LogOut</h3>
            </button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
