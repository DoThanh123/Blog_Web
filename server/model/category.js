import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.set('strictQuery', true);

const category = mongoose.model('category', CategorySchema);

export default category;
