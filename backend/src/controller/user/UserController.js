import {bcrypt, dotenv, jwt, ResponseMessage, StatusCodes, handleErrorResponse, sendResponse, User} from "../../index.js";
dotenv.config();

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;
        const findEmail = await User.findOne({ email, isDelete:0 });
        if (findEmail) {
            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                ResponseMessage.USER_ALREADY_EXIST,
                []
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, number,  
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        return sendResponse(
            res,
            StatusCodes.CREATED,
            ResponseMessage.USER_ADDED,
            savedUser
        );
    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, isDelete: 0 });
        if (!user) {

            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                ResponseMessage.USER_NOT_EXISTS,
               []
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                ResponseMessage.INCORRECT_CREDENTIALS,
               []
            );
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1m' });
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

        return sendResponse(
            res,
            StatusCodes.OK,
            ResponseMessage.LOGIN_SUCCESSFULLY,
            { token, refreshToken } 
        );

    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, error);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body; 

        if (!refreshToken) {
            return sendResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                ResponseMessage.NO_REFRESH_TOKEN,
                []
            );
        }

        jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return sendResponse(
                    res,
                    StatusCodes.FORBIDDEN,
                    ResponseMessage.INVALID_REFRESH_TOKEN,
                    []
                );
            }

            const user = await User.findById(decoded.userId);
            if (!user) {
                return sendResponse(
                    res,
                    StatusCodes.NOT_FOUND,
                    ResponseMessage.USER_NOT_EXISTS,
                    []
                );
            }

            const newAccessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                expiresIn: '15m',
            });

            return sendResponse(
                res,
                StatusCodes.OK,
                ResponseMessage.REFRESH_TOKEN_SUCCESS,
                { token: newAccessToken } 
            );
        });
    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, error);
    }
};


export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id:  req.user_id, isDelete: 0  });
        if (!user) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_EXISTS,
                data: []
            });
        }
        return sendResponse(
            res,
            StatusCodes.OK,
            ResponseMessage.GET_SINGLE_USER,
            user
        );
    } catch (error) {
        return handleErrorResponse(res, error);
    }
};


