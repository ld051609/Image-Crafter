import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Your username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Your email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Your password is required'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

// Saving user to database
const User = mongoose.model('User', userSchema);
export default User;
