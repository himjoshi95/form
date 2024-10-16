import { Master } from "../model/master.model.js";

export const addTestPaper = async (req,res) =>{
    const {type} = req.body    
    try {
        const training = await Master.findById(type);        
        res.json({
            training
        })
    } catch (error) {
        console.log("Error in addTestPaper Controller",error.message);
        res.json({
            message: error.message
        })
    }
}