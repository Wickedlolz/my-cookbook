const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/', async (req, res) => {
    const recipes = await recipeService.getAll(req.query);

    res.render('catalog', { recipes, query: req.query.search });
});

module.exports = router;
