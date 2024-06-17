const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, 'Your password is required'],
        unique: true,
    },
    email:{
        type: String,
        required:[true, 'Your email is required'],
        unique: true,
    },
    password:{
        type: String,
        required:[true, 'Your password is required'],
        unique: true,
    }, 
    createdAt:{
        type: Date,
        default: Date.now,
    }
})
// hash password before saving to database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)

})
// saving user to database
module.exports = mongoose.model('User', userSchema)