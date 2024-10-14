import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    industry:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    trainingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
    attendanceFlag:{
        type: Boolean,
        default:true
    },
    feedbackFlag:{
        type: Boolean,
        default:false
    },
    certificateFlag:{
        type:Boolean,
        default:false
    }    
},{ timestamps: true})


const testSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    totalQuestion: {
        type: Number,
        default: 5
    },
    CorrectAnswers: {
        type:Number
    }
}, { timestamps: true })

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: String
})

export const User = mongoose.model("User",userSchema);
export const Test = mongoose.model("Test",testSchema);
export const Feedback = mongoose.model("Feedback", feedbackSchema);
