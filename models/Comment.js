const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
    recipe: {
        type: Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
