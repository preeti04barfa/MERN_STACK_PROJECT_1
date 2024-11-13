import { auth, express, getSingleUser, refreshToken, RegisterUser, userLogin } from "../index.js"

const userRouter = express.Router()
userRouter.post("/user-add",RegisterUser);
userRouter.post("/user-login",userLogin);
userRouter.get("/get-single-user",auth, getSingleUser);
userRouter.post("/referesh-token", refreshToken);

export {userRouter}