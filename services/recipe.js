const Recipe = require('../models/Recipe');

function getAll(query) {
    const options = {};
    const startIndex = Number(query.startIndex) || 0;
    const limit = Number(query.limit) || Number.MAX_SAFE_INTEGER;

    if (query && query.search) {
        options.name = new RegExp(query.search.toLocaleLowerCase(), 'i');
    }

    // const recipes = await Recipe.find(options).skip(startIndex).limit(limit).lean();
    // return recipes;

    return Promise.all([
        Recipe.find(options).skip(startIndex).limit(limit).lean(),
        Recipe.find(options).countDocuments(),
    ]);
}

async function getLatest() {
    const recipes = await Recipe.find({})
        .sort({ createdOn: -1 })
        .limit(3)
        .lean();
    return recipes;
}

async function getOneById(id) {
    const recipe = await Recipe.findById(id).lean();
    return recipe;
}

async function create({ name, imageUrl, ingredients, steps, author }) {
    const createdOn = new Date().toDateString();
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

async function update(
    recipeId,
    { name, imageUrl, ingredients, steps },
    authorId
) {
    ingredients = ingredients.split('\r\n');
    steps = steps.split('\r\n');

    const recipe = await Recipe.findById(recipeId);

    if (recipe.author != authorId) {
        return false;
    }

    recipe.name = name;
    recipe.imageUrl = imageUrl;
    recipe.ingredients = ingredients;
    recipe.steps = steps;

    recipe.save();

    return {
        id: recipe._id,
    };
}

async function deleteById(recipeId, authorId) {
    const recipe = await getOneById(recipeId);

    if (recipe.author != authorId) {
        return false;
    }

    await Recipe.findByIdAndDelete(recipeId);
    return true;
}

module.exports = {
    getAll,
    getOneById,
    getLatest,
    create,
    update,
    deleteById,
};
