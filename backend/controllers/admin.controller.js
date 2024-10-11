import { Master } from "../model/master.model.js";


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