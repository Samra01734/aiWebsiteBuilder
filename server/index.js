import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",   // ← Fixed: added missing slashes (http://)
    credentials: true
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start Server
app.listen(port, async () => {
    console.log(`Server started on port ${port}`);
    
    // Connect to database after server starts
    try {
        await connectDb();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        // Optionally: process.exit(1); to stop server if DB is critical
    }
});