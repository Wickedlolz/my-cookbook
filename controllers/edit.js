const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipeService.getOneById(recipeId);
    recipe.ingredients = recipe.ingredients.join('\r\n');
    recipe.steps = recipe.steps.join('\r\n');

    res.render('edit', { recipe });
});

router.post('/:id', async (req, res) => {
    const recipeId = req.params.id;

    const { name, img, ingredients, steps } = req.body;
    const createdOn = new Date().toLocaleString();
    const updatedRecipe = await recipeService.update(recipeId, {
        name,
        imageUrl: img,
        ingredients,
        steps,
        createdOn,
    });

    res.redirect('/details/' + updatedRecipe._id);
});

module.exports = router;
