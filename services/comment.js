const Comment = require('../models/Comment');

async function getCommentsForRecipeById(recipeId) {
    const comments = await Comment.find({ recipe: recipeId })
        .populate('author')
        .lean();

    return comments;
}

async function create(recipeId, authorId, content) {
    const comment = new Comment({
        recipe: recipeId,
        author: authorId,
        content,
    });

    return await comment.save();
}

module.exports = {
    create,
    getCommentsForRecipeById,
};
