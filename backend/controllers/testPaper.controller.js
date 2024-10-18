import { Master } from "../model/master.model.js";
import { TestPaper } from "../model/testPaper.model.js";

export const addTestPaper = async (req, res) => {
    const { type: trainingId, sections } = req.body;
    try {
        const training = await Master.findById(trainingId).select("_id");

        if (!training) {
            return res.status(404).json({
                message: "Training not found"
            });
        }

        const newTestPaper = new TestPaper({
            training: trainingId,
            sections
        })

        const savedTestPaper = await newTestPaper.save();
        res.status(201).json(savedTestPaper);
        // res.status(200).json({
        //     training,
        //     sections
        // });                
    } catch (error) {
        console.log("Error in addTestPaper Controller", error.message);
        res.json({
            message: error.message
        })
    }
}

export const getTestPaper = async (req, res) => {
    const { type: trainingId } = req.query;

    try {

        const allTestPapers = await TestPaper.find({
            training: trainingId
        })

        res.json(allTestPapers)
    } catch (error) {
        console.log("Error in getTestPaper Controller", error.message);
        res.json({
            message: error.message
        })
    }

}

export const getSingleTestPaper = async (req, res) => {
    const { id: testId } = req.params;
    const desiredTestPaper = await TestPaper.findById(testId);
    return res.json(desiredTestPaper)
}

export const deleteTestPaper = async (req, res) => {
    const { id: testId } = req.params;
    try {
        await TestPaper.deleteOne({_id:testId})

        return res.json({
            message: "Test Paper Deleted Successfully"
        })


    } catch (error) {
        console.log("Error in deleteTestPaper controller", error.message);
        return res.json({
            message: error.message
        })
    }
}

export const deleteQuestion = async (req,res) =>{
    const {id:QuestionId} = req.params;
    try {
        console.log(QuestionId)
        return res.json({
            message: "QuestionID"
        })
    } catch (error) {
        console.log("Error in controller",error.message);
        return res.json({
            message:error.message
        })        
    }
}
