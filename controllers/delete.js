const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);
    recipe.ingredients = recipe.ingredients.join('\r\n');
    recipe.steps = recipe.steps.join('\r\n');

    res.render('delete', { recipe });
});

router.post('/:id', async (req, res) => {
    const recipeId = req.params.id;

    try {
        await recipeService.deleteById(recipeId);
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.redirect('/details/' + recipeId);
    }
});

module.exports = router;
