import User from '../models/authModel.js';
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const userVerification = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log("Token from cookies: ", token); // Debug line

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
        if(err){
            console.log("Token verification error: ", err); // Debug line
            return res.json({status: false})
        } else {
            console.log("Token data: ", data); // Debug line
            const user = await User.findById(data.id)
            if (!user){
                console.log("User not found"); // Debug line
                return res.json({status: false})
            }
            console.log("User verified: ", user.username); // Debug line
            return res.json({status: true, user: user.username})
        }
    })
}
export default userVerification;
