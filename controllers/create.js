const { Router } = require('express');
const router = Router();

const { body, validationResult } = require('express-validator');
const recipeService = require('../services/recipe');

router.get('/', (req, res) => {
    res.render('create');
});

router.post(
    '/',
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
            const data = { name, img, ingredients, steps };
            res.render('create', { errors: error, data });
        }
    }
);

module.exports = router;
