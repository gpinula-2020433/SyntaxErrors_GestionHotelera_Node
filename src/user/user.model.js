import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLenght: [25, "Name cant' be over 25 characters"],
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLenght: [15, "Surname cant' be over 15 characters"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
        lowercase: true,
        maxLenght: [25, "Username can't be over 25 characters"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        maxLenght: [50, "Email can't be over 50 characters"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLenght: [8, "Password is too short"],
        maxLenght: [15, "Password can't be over 15 characters"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minLenght: [8, "Password is too short"],
        maxLenght: [15, "phone is too long"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        uppercase: true,
        enum: ["USER", "ADMIN"],
    },
})

export default model("User", userSchema)