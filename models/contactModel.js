import User from "./userModel.js";
import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },
    name: {
        type: String,
        required: [true,"Please add the contact name" ]
    }, 
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    }, 
    phoneNumber:{
        type: String,
        required: [true, "Please add the contact phone number"]
    }}, 
    {
        timestamps : true
    }
)
/** @type {import('mongoose').Model<any>} */
const Contact = mongoose.model("Contact", contactSchema)

export default Contact;