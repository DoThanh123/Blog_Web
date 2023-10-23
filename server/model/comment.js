import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.set('strictQuery', true);

const comment = mongoose.model('comment', CommentSchema);

export default comment;
