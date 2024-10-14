import { Master } from "../model/master.model.js";
import { Test, User } from "../model/user.model.js";


export const addMaster = async(req,res) =>{
    const {name} = req.body;    
    const newMaster = await Master.create({
        name
    });

    return res.json({
        message: "Data inserted",
        id: newMaster._id,
        name: newMaster.name
    });
}

export const allTrainings = async(req,res) =>{

    try {
        const trainings = await Master.find({})
        res.json({
            trainings
        })
    } catch (error) {
        console.log("Error in allTrainings controller",error.message);
        res.json({
            message:error.message
        })
    }
}

export const updateStatus = async(req,res)=>{
    const {userId,dropdown} = req.body;   
    
    if(dropdown === 'Attendance'){
       try {
        const updateUser = await User.findByIdAndUpdate(userId,{
            attendanceFlag: true,            
            feedbackFlag:false,
            certificateFlag:false
        })
        console.log("updated status: Attendance");        
       } catch (error) {
            console.log("Error in updating Attendance Status",error.message);
            return res.json({message:error.message});
       }
    }else if(dropdown === 'Feedback'){
       try {
        const updateUser = await User.findByIdAndUpdate(userId,{
            attendanceFlag: true,            
            feedbackFlag:true,
            certificateFlag:false
        })
        console.log("updated status: Feedback");        
       } catch (error) {
        console.log("Error in updating Feedback Status",error.message);
        return res.json({message:error.message});
       }
    }else if(dropdown === 'Certificate'){
       try {
        const updateUser = await User.findByIdAndUpdate(userId,{
            attendanceFlag: true,
            feedbackFlag: true,
            certificateFlag:true
        })

        const existingTest = await Test.findOne({userId})

        if(!existingTest){
            const CorrectAnswers = Math.floor(Math.random() * 5) + 1;
            const newTest = await Test.create({
                userId,
                CorrectAnswers
            })
            console.log("New test result created for the user")
        }
        console.log("updated status: Certificate");        
       } catch (error) {
        console.log("Error in updating Certificate Status",error.message);
        return res.json({message:error.message});
       }
    }

    return res.json({       
        message: "Updated Successfully",
        dropdown
    })
}