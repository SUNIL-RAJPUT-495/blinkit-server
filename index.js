import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import otpRouter from './route/sendOtp.Router.js';

const app = express();

// CORS
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// Body parsers
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // specify format
app.use(helmet({ crossOriginEmbedderPolicy: false }));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Server is running on port " + PORT });
});

app.use('/api/user', userRouter);
app.use('/api/otp',otpRouter)

async function StartServer() {
    try{
        await connectDB();
         app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });

    }
    catch(err){
        console.error("Failed to connect to DB", err);
        process.exit(1)
    };
}

StartServer();