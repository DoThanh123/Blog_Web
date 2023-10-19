import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('add success');
    } catch (error) {
        response.status(500).json(error);
    }
};

export const getAllComments = async (request, response) => {
    try {
        const comments = await Comment.find({});

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error);
    }
};

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error);
    }
};

export const deleteComment = async (request, response) => {
    try {
        await Comment.findByIdAndDelete(request.params.id);

        response.status(200).json('success delete');
    } catch (error) {
        response.status(500).json(error);
    }
};

export const removeComment = async (request, response) => {
    try {
        await Comment.deleteMany({ postId: request.params.id });

        response.status(200).json('delete');
    } catch (error) {
        response.status(500).json(error);
    }
};
