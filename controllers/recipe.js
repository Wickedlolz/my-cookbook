const router = require('express').Router();

const recipeService = require('../services/recipe');
const commentService = require('../services/comment');
const { isUser, isCreator } = require('../middlewares/guards');

const { body, validationResult } = require('express-validator');
const mapErrors = require('../util/mapper');

router.get('/', async (req, res) => {
    const recipes = await recipeService.getAll(req.query);

    res.render('catalog', { recipes, query: req.query.search });
});

router.get('/details/:id', async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);
    let comments = await commentService.getCommentsForRecipeById(req.params.id);

    if (req.session.user && req.session.user.id == recipe.author) {
        res.locals.isOwner = true;
    }

    // if (req.session.user) {
    //     res.locals.isLogged = true;
    // }

    res.render('details', { recipe, comments });
});

router.post('/details/:id', isUser(), async (req, res) => {
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

            res.redirect('/recipes/details/' + req.params.id);
        } catch (error) {
            console.error(error.message);
            res.redirect('/details/' + req.params.id);
        }
    } else {
        res.redirect('/users/login');
    }
});

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post(
    '/create',
    isUser(),
    body('name').trim(),
    body('img').trim(),
    body('ingredients').trim(),
    body('steps').trim(),
    body('name')
        .notEmpty()
        .withMessage('Recipe name is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Recipe name must be at least 3 characters long!'),
    body('img')
        .notEmpty()
        .withMessage('Image URL is required!')
        .bail()
        .custom(
            (value, { req }) =>
                value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('Invalid Image URL'),
    body('ingredients').notEmpty().withMessage('Ingredients is required!'),
    body('steps').notEmpty().withMessage('Steps is required!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        let { name, img, ingredients, steps } = req.body;
        ingredients = ingredients.split('\r\n');
        steps = steps.split('\r\n');

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await recipeService.create({
                name,
                imageUrl: img,
                ingredients,
                steps,
                author: req.session.user.id,
            });

            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            const data = { name, img, ingredients, steps };
            res.render('create', { errors, data });
        }
    }
);

router.get('/edit/:id', isUser(), isCreator(), async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipeService.getOneById(recipeId);

    if (recipe.author != req.session.user.id) {
        return res.redirect('/users/login');
    }

    recipe.ingredients = recipe.ingredients.join('\r\n');
    recipe.steps = recipe.steps.join('\r\n');

    res.render('edit', { recipe });
});

router.post(
    '/edit/:id',
    isUser(),
    isCreator(),
    body('name').trim(),
    body('img').trim(),
    body('ingredients').trim(),
    body('steps').trim(),
    body('name')
        .notEmpty()
        .withMessage('Recipe name is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Recipe name must be at least 3 characters long!'),
    body('img')
        .notEmpty()
        .withMessage('Image URL is required!')
        .bail()
        .custom(
            (value, { req }) =>
                value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('Invalid Image URL'),
    body('ingredients').notEmpty().withMessage('Ingredients is required!'),
    body('steps').notEmpty().withMessage('Steps is required!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const recipeId = req.params.id;
        const { name, img, ingredients, steps } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const updatedRecipe = await recipeService.update(
                recipeId,
                {
                    name,
                    imageUrl: img,
                    ingredients,
                    steps,
                },
                req.session.user.id
            );

            if (updatedRecipe) {
                res.redirect('/recipes/details/' + updatedRecipe.id);
            } else {
                res.redirect('/users/login');
            }
        } catch (error) {
            const errors = mapErrors(errors);
            const data = { name, img, ingredients, steps };
            res.render('edit', { errors, data });
        }
    }
);

router.get('/delete/:id', isUser(), isCreator(), async (req, res) => {
    const recipe = await recipeService.getOneById(req.params.id);

    if (recipe.author != req.session.user.id) {
        return res.redirect('/users/login');
    }

    recipe.ingredients = recipe.ingredients.join('\r\n');
    recipe.steps = recipe.steps.join('\r\n');

    res.render('delete', { recipe });
});

router.post('/delete/:id', isUser(), isCreator(), async (req, res) => {
    const recipeId = req.params.id;

    try {
        const isDeleted = await recipeService.deleteById(
            recipeId,
            req.session.user.id
        );

        if (isDeleted) {
            res.redirect('/');
        } else {
            res.redirect('/users/login');
        }
    } catch (error) {
        console.error(error.message);
        res.redirect('/recipes/details/' + recipeId);
    }
});

module.exports = router;
