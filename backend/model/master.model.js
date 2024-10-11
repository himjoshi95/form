import mongoose from "mongoose";

const masterSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
},{ timestamps: true})

export const Master = mongoose.model("Master", masterSchema);
