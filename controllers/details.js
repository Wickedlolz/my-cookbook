const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');
const commentService = require('../services/comment');

router.get('/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);
    const comments = await commentService.getCommentsForRecipeById(
        req.params.id
    );

    if (req.session.user && req.session.user.id == recipe.author) {
        res.locals.isOwner = true;
    }

    if (req.session.user) {
        res.locals.isLogged = true;
    }

    res.render('details', { recipe, comments });
});

router.post('/:id', async (req, res) => {
    const content = req.body.content;

    if (req.session.user) {
        try {
            await commentService.create(
                req.params.id,
                req.session.user.id,
                content
            );

            res.redirect('/details/' + req.params.id);
        } catch (error) {
            console.error(error.message);
            res.redirect('/');
        }
    } else {
        res.redirect('/users/login');
    }
});

module.exports = router;
