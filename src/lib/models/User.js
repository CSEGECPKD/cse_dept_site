import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { _id: false }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
