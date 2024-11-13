import axios from "axios"; 
export var BASE_URL = "http://localhost:3008"

export const DataService = axios.create({
    baseURL: BASE_URL,
  });
  