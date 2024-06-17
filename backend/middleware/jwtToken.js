import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};
