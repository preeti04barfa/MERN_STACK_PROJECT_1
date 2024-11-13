import { cors, dataBase, dotenv, express, userRouter } from './src/index.js';

const app = express()
dotenv.config();
const PORT = process.env.PORT
dataBase();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/user", userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`);
})
export default app