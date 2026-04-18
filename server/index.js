import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";   // Make sure this path is correct

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http:localhost:5173",
    credentials:true
}));

// Routes
app.use("/api/auth", authRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    connectDb();
});