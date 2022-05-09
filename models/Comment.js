const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
    recipe: {
        type: Types.ObjectId,
        ref: 'Recipe',
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
