import bcryptjs from "bcryptjs";

import Admin from "../model/admin.model.js";
import { Master } from "../model/master.model.js";
import { Test, User } from "../model/user.model.js";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


export const checkAuth = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select("-password");
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }
        res.status(200).json({ success: true, admin });
    } catch (error) {
        console.log("Error in checkAuth controller ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error("All fields are required");
        }

        const adminAlreadyExists = await Admin.findOne({ username });
        console.log("adminAlreadyExists", adminAlreadyExists);

        if (adminAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const admin = new Admin({
            username,
            password: hashedPassword
        })

        await admin.save();

        //jwt
        generateTokenAndSetCookie(res, admin._id)

        return res.json({
            message: "Sign up Page",
            admin: {
                ...admin._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in admin signup controller", error.message)
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        //jwt
        generateTokenAndSetCookie(res, admin._id)

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            admin: {
                ...admin._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(400).json({ success: false, message: error.message })
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

export const addMaster = async (req, res) => {
    const { name } = req.body;
    const newMaster = await Master.create({
        name
    });

    return res.json({
        message: "Data inserted",
        id: newMaster._id,
        name: newMaster.name
    });
};

export const allTrainings = async (req, res) => {

    try {
        const trainings = await Master.find({})
        res.json({
            trainings
        })
    } catch (error) {
        console.log("Error in allTrainings controller", error.message);
        res.json({
            message: error.message
        })
    }
};

export const updateStatus = async (req, res) => {
    const { userId, dropdown } = req.body;

    if (dropdown === 'Attendance') {
        try {
            const updateUser = await User.findByIdAndUpdate(userId, {
                attendanceFlag: true,
                testPaperFlag:false,
                feedbackFlag: false,
                certificateFlag: false
            })
            console.log("updated status: Attendance");
        } catch (error) {
            console.log("Error in updating Attendance Status", error.message);
            return res.json({ message: error.message });
        }
    } else if( dropdown === 'Test Paper'){
        try {
            const updateUser = await User.findByIdAndUpdate(userId, {
                attendanceFlag: true,
                testPaperFlag:true,
                feedbackFlag: false,
                certificateFlag: false
            })
            console.log("updated status: Test Paper");
        } catch (error) {
            console.log("Error in updating Test Paper Status", error.message);   
            return res.json({ message: error.message });         
        }
    } else if (dropdown === 'Feedback') {
        try {
            const updateUser = await User.findByIdAndUpdate(userId, {
                attendanceFlag: true,
                testPaperFlag:true,
                feedbackFlag: true,
                certificateFlag: false
            })
            console.log("updated status: Feedback");
        } catch (error) {
            console.log("Error in updating Feedback Status", error.message);
            return res.json({ message: error.message });
        }
    } else if (dropdown === 'Certificate') {
        try {
            const updateUser = await User.findByIdAndUpdate(userId, {
                attendanceFlag: true,
                testPaperFlag:true,
                feedbackFlag: true,
                certificateFlag: true
            })

            const existingTest = await Test.findOne({ userId })

            if (!existingTest) {
                const CorrectAnswers = Math.floor(Math.random() * 5) + 1;
                const newTest = await Test.create({
                    userId,
                    CorrectAnswers
                })
                console.log("New test result created for the user")
            }
            console.log("updated status: Certificate");
        } catch (error) {
            console.log("Error in updating Certificate Status", error.message);
            return res.json({ message: error.message });
        }
    }

    return res.json({
        message: "Updated Successfully",
        dropdown
    })
};

export const updateTraining = async (req, res) => {
    const { type, dropdown , link} = req.body;
    try {    
        
        const trainingStatusUpdate = await Master.findByIdAndUpdate(type,{
            status:dropdown,
            link: link === 'Yes' ? true : false
        });

        if(dropdown === 'Select Status'){
            try {
                return res.json({
                    message: "Select Status - No Change"
                })
                
            } catch (error) {
                console.log("Error when dropdown in select Status",error.message)
                res.json({
                    message: error.message
                })
            }

        }else if (dropdown === 'Attendance') {
            try {
                const updateAttendance = {
                    attendanceFlag: true,                    
                    testPaperFlag:false,
                    feedbackFlag: false,
                    certificateFlag: false
                }
                const attendanceUpdate = await User.updateMany({trainingId: type},updateAttendance);

                res.json({
                    message: "Updated Status to Attendance"
                })
            } catch (error) {
                console.log("Error in updateTraining controller Attendance",error.message);
                res.json({
                    message: error.message
                })
            }
        }else if(dropdown === 'Test Paper'){
            try {
                const updateTestPaper = {
                    attendanceFlag:true,
                    testPaperFlag:true,
                    feedbackFlag:false,
                    certificateFlag:false
                }
                const testPaperUpdate = await User.updateMany({trainingId: type}, updateTestPaper);

                res.json({
                    message: "Updated Status to Test Paper"
                })
                
            } catch (error) {
                console.log("Error in UpdateTraining controller Test Paper",error.message);
            }

        }else if(dropdown === 'Feedback'){
            try {
                const updateFeedback = {
                    attendanceFlag: true,
                    testPaperFlag:true,
                    feedbackFlag: true,
                    certificateFlag: false                    
                }
                const feedbackUpdate = await User.updateMany({trainingId: type},updateFeedback);

                res.json({
                    message: "Updated Status to Feedback"
                })
                
            } catch (error) {
                console.log("Error in updateTraining controller Feedback",error.message);
                res.json({
                    message:error.message
                })                
            }
        }else if(dropdown === 'Certificate'){
            try {
                const updateCertificate = {
                    attendanceFlag: true,
                    testPaperFlag:true,
                    feedbackFlag:true,
                    certificateFlag:true
                }

                const certificateUpdate = await User.updateMany({trainingId: type},updateCertificate);

                res.json({
                    message: "Updated Status to Certificate"
                })
                
            } catch (error) {
                console.log("Error in updateTraining controller Certificate",error.message);
                res.json({
                    message:error.message
                })
            }

        }
        
    } catch (error) {
        console.log("Error in updateTraining @Whole", error.message);
        return res.json({
            message: error.message
        });
    }
};

export const trainingDetails = async (req,res) =>{
    const {type} = req.query;

    try {
        const training = await Master.findById(type).select("-_id").select("-createdAt").select("-updatedAt");
        res.json({
            training
        })
        
    } catch (error) {
        console.log("Error in training Details controller",error.message);
        res.json({
            message: error.message
        })
    }
};