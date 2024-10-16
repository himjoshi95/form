import { Master } from "../model/master.model.js";
import { TestPaper } from "../model/testPaper.model.js";

export const addTestPaper = async (req,res) =>{
    const {type:trainingId} = req.body;    
    try {
        const training = await Master.findById(trainingId).select("_id"); 

        if(!training){
            return res.status(404).json({
                message: "Training not found"
            });
        }

        // const newTestPaper = new TestPaper({
        //     title,
        //     training: trainingId,
        //     sections
        // })

        // const savedTestPaper = await newTestPaper.save();
        // res.status(201).json(savedTestPaper);
        res.status(200).json({
            training
        });                
    } catch (error) {
        console.log("Error in addTestPaper Controller",error.message);
        res.json({
            message: error.message
        })
    }
}