import { createTask, deleteTask, editTask, getSingleTask, getTask } from "../controller/user/TaskController.js";
import { auth, express, getSingleUser, refreshToken, RegisterUser, userLogin } from "../index.js"

const userRouter = express.Router()
userRouter.post("/user-add",RegisterUser);
userRouter.post("/user-login",userLogin);
userRouter.get("/get-single-user",auth, getSingleUser);
userRouter.post("/referesh-token", refreshToken);
userRouter.post("/task-create",auth, createTask);
userRouter.get("/get-task",auth, getTask);
userRouter.get("/get-single-task",auth, getSingleTask);
userRouter.post("/delete-task",auth, deleteTask);
userRouter.post("/edit-task",auth, editTask);

export {userRouter}