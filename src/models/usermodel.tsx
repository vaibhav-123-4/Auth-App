import { verify } from 'crypto';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true , unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin : { type: Boolean, default: false },
    forgotpasswordToken: { type: String, default: null },
    forgotpasswordExpiry: { type: Date, default: null },
    verifyToken: { type: String, default: null },
    verifyTokenExpiry: { type: Date, default: null },
    
})
const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;