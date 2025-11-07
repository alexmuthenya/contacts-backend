import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: [true, "Email is required"],

    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email adress already taken"]

    },
    password:{
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
})


/** @type {import('mongoose').Model<any>} */

const User = mongoose.model("User", userSchema)

export default User;