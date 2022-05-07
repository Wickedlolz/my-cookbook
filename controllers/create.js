const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    let { name, img, ingredients, steps } = req.body;
    ingredients = ingredients.split('\r\n');
    steps = steps.split('\r\n');

    await recipeService.create({
        name,
        imageUrl: img,
        ingredients,
        steps,
        author: req.session.user.id,
    });

    res.redirect('/');
});

module.exports = router;
