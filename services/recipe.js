const Recipe = require('../models/Recipe');

async function getAll(query) {
    const options = {};

    if (query && query.search) {
        options.name = new RegExp(query.search.toLocaleLowerCase(), 'i');
    }

    const recipes = await Recipe.find(options).lean();
    return recipes;
}

async function getOneById(id) {
    const recipe = await Recipe.findById(id).lean();
    return recipe;
}

async function create({ name, imageUrl, ingredients, steps }) {
    const createdOn = new Date().toLocaleString();
    const recipe = new Recipe({
        name,
        imageUrl,
        ingredients,
        steps,
        createdOn,
    });
    return await recipe.save();
}

module.exports = {
    getAll,
    getOneById,
    create,
};
