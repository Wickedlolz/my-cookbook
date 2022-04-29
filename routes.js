const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/home');
const catalogController = require('./controllers/catalog');
const detailsController = require('./controllers/details');
const createController = require('./controllers/create');
const editController = require('./controllers/edit');
const authController = require('./controllers/auth');

router.use('/', homeController);
router.use('/catalog', catalogController);
router.use('/details/:id', detailsController);
router.use('/create', createController);
router.use('/edit/:id', editController);
router.use('/users', authController);

module.exports = router;
