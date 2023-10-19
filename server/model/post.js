import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.set('strictQuery', true);

const post = mongoose.model('post', PostSchema);

export default post;