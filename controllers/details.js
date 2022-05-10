const { Router } = require('express');
const router = Router();

const recipeService = require('../services/recipe');
const commentService = require('../services/comment');

router.get('/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);
    let comments = await commentService.getCommentsForRecipeById(req.params.id);

    if (req.session.user && req.session.user.id == recipe.author) {
        res.locals.isOwner = true;
    }

    if (req.session.user) {
        res.locals.isLogged = true;
    }

    let date = new Date().toLocaleString();

    res.render('details', { recipe, comments, date });
});

router.post('/:id', async (req, res) => {
    const content = req.body.content;

    if (req.session.user) {
        try {
            if (content == '') {
                throw new Error('Comment fields are required!');
            }

            await commentService.create(
                req.params.id,
                req.session.user.id,
                content
            );

            res.redirect('/details/' + req.params.id);
        } catch (error) {
            console.error(error.message);
            res.redirect('/details/' + req.params.id);
        }
    } else {
        res.redirect('/users/login');
    }
});

module.exports = router;
