import axios from "axios"; 
import { Api } from "./Api";
import { toast } from "react-toastify";
export var BASE_URL = "http://localhost:3008";


export const DataService = axios.create({
    baseURL: BASE_URL,
  });
  const handleRefreshToken = async () => {
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
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An unexpected error occurred");
    }
  };
  
  DataService.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      if (status === 401) {
        handleRefreshToken()
      }
      return Promise.reject(error);
    }
  );