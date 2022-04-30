const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');

router.get('/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);
    res.render('details', { recipe });
});

module.exports = router;
