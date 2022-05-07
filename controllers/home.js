const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/', async (req, res) => {
    console.log(req.session);
    const latestRecipes = await recipeService.getLatest();
    res.render('index', { latestRecipes });
});

module.exports = router;
