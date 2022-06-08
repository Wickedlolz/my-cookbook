const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/home');
const authController = require('./controllers/auth');
const recipeController = require('./controllers/recipe');

router.use('/', homeController);
router.use('/recipes', recipeController);
router.use('/users', authController);

module.exports = router;
