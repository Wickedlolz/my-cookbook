const Recipe = require('../models/Recipe');

async function getAll(query) {
    const options = {};

    if (query && query.search) {
        options.name = new RegExp(query.search.toLocaleLowerCase(), 'i');
    }

    const recipes = await Recipe.find(options).lean();
    return recipes;
}

async function getLatest() {
    const recipes = await Recipe.find({}).sort('-createdOn').limit(3).lean();
    return recipes;
}

async function getOneById(id) {
    const recipe = await Recipe.findById(id).lean();
    return recipe;
}

async function create({ name, imageUrl, ingredients, steps, author }) {
    const createdOn = new Date().toLocaleString();
    const recipe = new Recipe({
        name,
        imageUrl,
        ingredients,
        steps,
        createdOn,
        author,
    });
    return await recipe.save();
}

async function update(recipeId, { name, imageUrl, ingredients, steps }) {
    ingredients = ingredients.split('\r\n');
    steps = steps.split('\r\n');
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
        $set: { name, imageUrl, ingredients, steps },
    });

    return updatedRecipe;
}

async function deleteById(recipeId) {
    return await Recipe.findByIdAndDelete(recipeId);
}

module.exports = {
    getAll,
    getOneById,
    getLatest,
    create,
    update,
    deleteById,
};
