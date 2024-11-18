import { mongoose } from "../index.js";

const taskSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: false
    },
    issueType: {
        type: String,
        required: false,
    },
    shortSummary: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false,
    },
    assigneer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: false
    },
    reporter: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: false
    },
    assignedDate: {
        type: Date,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    taskDuration: {
        type: Number,
        required: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export { Task };
