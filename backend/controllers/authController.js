import User from '../models/authModel.js';
import { generateAccessToken } from '../middleware/jwtToken.js';
import bcrypt from 'bcryptjs';

export const Signup = async (req, res, next) => {
    try {
        const { username, email, password, createdAt } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ message: 'User already exists' });
        // }
        // Create user
        const user = await User.create({ username, email, password, createdAt });
        // Generate token
        const token = generateAccessToken(user._id);
        // Send the cookie to the client
        res.cookie("jwtToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: 'User created successfully', success: true });
    } catch (err) {
        console.log(err);
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const authPassword = await bcrypt.compare(password, user.password);
        if (!authPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const jwtToken = generateAccessToken(user._id);
        res.cookie("jwtToken", jwtToken, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({ message: 'Login successful', success: true });
    } catch (err) {
        console.log(err);
    }
};
