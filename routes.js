const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('./services/util');

const homeController = require('./controllers/home');
const catalogController = require('./controllers/catalog');
const detailsController = require('./controllers/details');
const createController = require('./controllers/create');
const editController = require('./controllers/edit');
const authController = require('./controllers/auth');
const deleteController = require('./controllers/delete');

router.use('/', homeController);
router.use('/catalog', catalogController);
router.use('/details', detailsController);
router.use('/create', isLoggedIn(), createController);
router.use('/edit', isLoggedIn(), editController);
router.use('/delete', isLoggedIn(), deleteController);
router.use('/users', authController);

module.exports = router;
