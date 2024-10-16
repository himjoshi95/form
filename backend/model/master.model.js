import mongoose from "mongoose";

const masterSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default: 'Select Status'
    },
    link:{
        type:Boolean,
        default:true
    }
},{ timestamps: true})




export const Master = mongoose.model("Master", masterSchema);

