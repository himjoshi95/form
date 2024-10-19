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
    },
    trainers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }]
},{ timestamps: true})

export const Master = mongoose.model("Master", masterSchema);

