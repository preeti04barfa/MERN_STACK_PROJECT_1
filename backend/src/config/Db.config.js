import  mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URl = process.env.MONGODB_URL
export const dataBase = async () =>{
    try{
      await mongoose.connect(MONGODB_URl)
      console.log('Database connected ...');
    }catch(e){
  console.log(e);
    }
  }
