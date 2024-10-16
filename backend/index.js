import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import testPaperRoutes from "./routes/testPaper.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = 3000;

// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser()); 

app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/testPaper",testPaperRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})