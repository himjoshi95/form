import { Master } from "../model/master.model.js";
import { User, Test, Feedback } from "../model/user.model.js";
import mongoose from "mongoose";

export const formData = async (req, res) => {
    const { title,
        firstName,
        lastName,
        mobile,
        email,
        designation,
        company,
        industry,
        city,
        trainingId } = req.body;

    const userData = req.body;
    try {
        if (userData) {
            const newUser = new User({
                title,
                firstName,
                lastName,
                mobile,
                email,
                designation,
                company,
                industry,
                city,
                trainingId
            })

            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            })
        } else {
            throw new Error("All fields required")
        }
    } catch (error) {
        console.log("Error in formData Controller", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const searchMobile = async (req, res) => {

    const filterQuery = req.query.filter || "";

    try {
        const filterUser = await User.findOne({
            mobile: filterQuery
        })

        if (filterUser) {
            return res.json({
                success: false,
                message: "Mobile Number already exists"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: ""
            })
        }
    } catch (error) {
        console.log("Error in SearchMobile Controller", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const filterEmail = async (req, res) => {

    const filterQuery = req.query.filter || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (filterQuery && !emailRegex.test(filterQuery)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    } else {
        return res.status(200).json({
            success: true,
            message: ""
        })
    }


}

export const userDetails = async (req, res) => {
    const { filter } = req.query;

    // console.log(filter);
    // Ensure filter is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(filter)) {
        return res.status(400).json({ error: 'Invalid filter ID' });
    }

    // const desiredUser =  await User.findById(filter);    
    // const desiredTraining = await Master.findById(desiredUser?.trainingId);    
    // const trainingName = desiredTraining.name;    

    // return res.json({
    //     filter,
    //     desiredUser,
    //     trainingName        
    // })

    try {
        const desiredUser = await User.findById(filter);
        if (!desiredUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const desiredTraining = await Master.findById(desiredUser.trainingId);
        if (!desiredTraining) {
            return res.status(404).json({ error: 'Training record not found' });
        }

        const trainingName = desiredTraining.name;

        return res.json({
            filter,
            desiredUser,
            trainingName
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
}

export const allUsers = async (req, res) => {
    const adminId = req.adminId;
    const filterQuery = req.query.filter || "";
    // console.log(adminId) -- see this for adminId via middleware
    try {
        // const existingUsers = await User.find({}).populate('trainingId');
        const Users = await User.find({firstName:{
           "$regex":filterQuery,"$options":"i"
        }}).populate({
                    path: 'trainingId',
                    match: { trainers: adminId }
                })
                .exec()
        // console.log("------------")
        // existingUsers = existingUsers.filter(user => user.trainingId);
        const existingUsers = Users.filter(user => user.trainingId !== null)
        // console.log(existingUsers) --- see if any issue
        if (!existingUsers) {
            return res.json(404).json({ error: 'User not Found' });
        }
        return res.json({
            existingUsers
        })

    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }

    return res.json({
        message: "All users"
    })
}

export const testDetails = async (req, res) => {
    const { userId } = req.body;
    const CorrectAnswers = Math.floor(Math.random() * 5) + 1;
    try {

        const updateUser = await User.findByIdAndUpdate(userId, { feedbackFlag: true, 
            testPaperFlag:true }, { new: true, runValidators: true })

        if (!updateUser) {
            console.log("User not found");
        }

        const newTest = await Test.create({
            userId,
            CorrectAnswers
        })

        res.json({
            userId: newTest.userId,
            newTest
        })

    } catch (error) {
        console.log("Error in testDetails controller", error.message)
        return res.json({
            message: error.message
        })
    }
}

export const submitFeedback = async (req, res) => {

    const { feedback, userId } = req.body

    try {

        const userUpdateCertificalFlag = await User.findByIdAndUpdate(userId, {
            certificateFlag: true
        }, { new: true, runValidators: true })

        if (!userUpdateCertificalFlag) {
            console.log("User not found");
        }

        const userFeedback = await Feedback.create({
            userId,
            feedback
        })

        return res.json({
            userId,
            userFeedback
        })
    } catch (error) {
        console.log('Error in submitFeedback Controller', error.message);
        return res.json({
            message: error.message
        })
    }
}

export const getCertificate = async (req, res) => {
    const { userId } = req.query;

    const userDetails = await User.findById(userId);
    const trainingDetails = await Master.findById(userDetails.trainingId);
    const testDetails = await Test.find({ userId });

    const percentile = ((testDetails[0]?.CorrectAnswers || 5) / (testDetails[0]?.totalQuestion || 5)) * 100

    return res.json({
        userId,
        userDetails,
        trainingId: userDetails.trainingId,
        trainingDetails,
        testDetails,
        percentile
    })
}

