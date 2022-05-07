const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);

    if (recipe.author != req.session.user.id) {
        return res.redirect('/users/login');
    }

    recipe.ingredients = recipe.ingredients.join('\r\n');
    recipe.steps = recipe.steps.join('\r\n');

    res.render('delete', { recipe });
});

router.post('/:id', async (req, res) => {
    const recipeId = req.params.id;

    try {
        if (await recipeService.deleteById(recipeId, req.session.user.id)) {
            res.redirect('/');
        } else {
            res.redirect('/users/login');
        }
    } catch (error) {
        console.error(error.message);
        res.redirect('/details/' + recipeId);
    }
});

module.exports = router;
