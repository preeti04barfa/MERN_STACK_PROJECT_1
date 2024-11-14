import { handleErrorResponse, ResponseMessage, sendResponse, StatusCodes, Task } from "../../index.js";

export const createTask = async (req, res) => {
    try {
        const { projectName, issueType, shortSummary, description, priority, assigneer, assignedDate, reporter,dueDate, taskDuration } = req.body;
        const newTask = new Task({
            projectName, issueType, shortSummary, description, priority, assigneer, reporter, assignedDate, dueDate, taskDuration
        });
        const savedTask = await newTask.save();
        return sendResponse(
            res,
            StatusCodes.CREATED,
            ResponseMessage.TASK_ADDED,
            savedTask
        );
    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};

export const getTask = async (req, res) => {
    try {
        const findTask = await Task.find({ isDelete: false });

        if (findTask) {
            return sendResponse(
                res,
                StatusCodes.OK,
                ResponseMessage.GETALL_TASK,
                findTask
            );
        }

        return sendResponse(
            res,
            StatusCodes.NOT_FOUND,
            ResponseMessage.TASK_NOT_FOUND,
            []
        );

    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};

export const getSingleTask = async (req, res) => {
    try {
        const findTask = await Task.findOne({ _id: req.body.id, isDelete: false });
        if (findTask) {
            return sendResponse(
                res,
                StatusCodes.OK,
                ResponseMessage.GET_SINGLE_TASK,
                findTask
            );
        }

        return sendResponse(
            res,
            StatusCodes.NOT_FOUND,
            ResponseMessage.TASK_NOT_FOUND,
            []
        );

    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};

export const editTask = async (req, res) => {
    try {
        const { id, ...updateFields } = req.body;

        if (!id) {
            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                "Task ID is required",
                []
            );
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, isDelete: false },
            updateFields,
            { new: true }
        );

        if (updatedTask) {
            return sendResponse(
                res,
                StatusCodes.OK,
                ResponseMessage.TASK_EDIT,
                updatedTask
            );
        }

        return sendResponse(
            res,
            StatusCodes.NOT_FOUND,
            ResponseMessage.TASK_NOT_FOUND,
            []
        );

    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};



export const deleteTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.body.id, isDelete: false },
            { isDelete: true },
            { new: true }
        );

        if (updatedTask) {
            return sendResponse(
                res,
                StatusCodes.OK,
                ResponseMessage.TASK_DELETED,
                updatedTask
            );
        }

        return sendResponse(
            res,
            StatusCodes.NOT_FOUND,
            ResponseMessage.TASK_NOT_FOUND,
            []
        );

    } catch (error) {
        console.log(error, 'error');
        return handleErrorResponse(res, error);
    }
};
