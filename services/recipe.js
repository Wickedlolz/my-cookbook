const Recipe = require('../models/Recipe');

async function getAll() {
    const recipes = await Recipe.find({}).lean();
    return recipes;
}

async function create({ name, imageUrl, ingredients, steps }) {
    const recipe = new Recipe({ name, imageUrl, ingredients, steps });
    return await recipe.save();
}

module.exports = {
    getAll,
    create,
};
