const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/', async (req, res) => {
    const recipes = [];

    res.render('catalog', { recipes });
});

module.exports = router;
