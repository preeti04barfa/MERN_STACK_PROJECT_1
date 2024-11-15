import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "./utils/ResponseMessage.js";
import bcrypt from "bcrypt"; 
import { handleErrorResponse, sendResponse } from "./service/CommonService.js";
import auth from "./middleware/Auth.js";
import { getSingleUser, refreshToken, RegisterUser, userLogin } from "./controller/user/UserController.js";
import { dataBase } from "./config/Db.config.js";
import { User } from "./model/User.js";
import { userRouter } from "./router/Router.js";
import cors from "cors";
import { Task } from "./model/Task.js";
import { getTask } from "./controller/user/TaskController.js";
;

export {mongoose,express,dataBase, User,jwt, StatusCodes, dotenv, ResponseMessage, bcrypt,
    handleErrorResponse, sendResponse, auth, RegisterUser,userLogin, getSingleUser, userRouter,cors, refreshToken, Task,getTask}