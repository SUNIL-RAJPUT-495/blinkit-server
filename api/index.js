import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from '../config/connectDB.js';

import userRouter from '../route/adminRouter/user.router.js';
import otpRouter from '../route/sendOtp.Router.js';

// Admin Routers
import uploadRouter from '../route/adminRouter/upload.routes.js';
import product from '../route/adminRouter/creat.product.router.js';
import categoryRoutes from '../route/adminRouter/category.router.js';
import Sub_Category from '../route/adminRouter/subCategory.js';
import adminRouter from '../route/adminRouter/Admin.router.js';
import order from '../route/adminRouter/order.router.js';



const app = express();

const allowedOrigins = [
    "https://blinkit-client-ten.vercel.app",
    "https://blinkit-client-ten.vercel.app/",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        // Agar origin list mein hai ya request local/server-side hai
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginEmbedderPolicy: false }));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Server is running on port " + PORT });
});
connectDB();

// User Routes
app.use('/api/user', userRouter);
app.use('/api/otp', otpRouter);

// Correct uploads static path
app.use("/uploads", express.static("uploads"));

// Admin routes
app.use("/api/category", categoryRoutes);
app.use("/api/file", uploadRouter)
app.use("/api/admin", adminRouter)
app.use("/api/subcategory", Sub_Category);
app.use("/api/product", product);
app.use("/api/order",order)

export default app;

