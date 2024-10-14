import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Username is required"],
        unique: true
    },
    password:{
        type:String,
        required: [true,"Password is required"]
    }
});

const Admin = mongoose.model("Admin",adminSchema);

export default Admin;