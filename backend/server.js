import express from 'express'
import { dataBase } from './src/config/Db.config.js';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT

dataBase();

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`);
})
  export default app