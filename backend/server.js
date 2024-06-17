import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js'; // Ensure the extension is included

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute);

// API
// const response = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: "a white siamese cat",
//     n: 1,
//     size: "1024x1024",
// });
// const image_url = response.data[0].url;

// Initialize the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
