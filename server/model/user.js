import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
        },
        avatar: {
            type: String,
        },
        background: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.set('strictQuery', true);

const user = mongoose.model('user', userSchema);

export default user;
