
const User = require('../models/authModel')
const {generateAccessToken} = require('../middleware/jwtToken')
const bcrypt = require('bcryptjs')



module.exports.Signup = async (req, res, next) => {
    try{
        const {username, email, password, createdAt} = req.body
        if(!username || !email || !password){
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'User already exists'})
        }
        // create user
        const user = await User.create({username, email, password, createdAt})
        // generate token
        const token = generateAccessToken(user._id) 
        // send the cookie to the client
        res.cookie("jwtToken", token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.status(201).json({message: 'User created successfully'})
    }catch(err){
        console.log(err)
    }
}

module.exports.Login = async (req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'})
        }
        const authPassword = await bcrypt.compare(password, user.password)
        if(!authPassword){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        // create jwt token
        const jwtToken = generateAccessToken(user._id)
        res.cookie("jwtToken", jwtToken, {
            withCredentials: true,
            httpOnly: false,
        })
        res.status(200).json({message: 'Login successful'})
        // next()
    }catch(err){
        console.log(err)
    }
}