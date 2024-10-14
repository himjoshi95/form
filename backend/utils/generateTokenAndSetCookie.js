import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,adminId)=>{
    const token = jwt.sign({ adminId },process.env.JWT_SECRET)

    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

}
