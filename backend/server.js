import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js'; // Ensure the extension is included
import dbConnect from './middleware/dbConnect.js';
import createImgRoute from './routes/createImgRoute.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.json())
// Database connection
dbConnect();

// Routes
app.use("/", authRoute);
app.use("/", createImgRoute);


// Initialize the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
