import { mongoose } from "../index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    number: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    isDelete: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export { User };
