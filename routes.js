const { Router } = require('express');
const router = Router();

const { isUser, isGuest } = require('./services/util');

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
router.use('/create', isUser(), createController);
router.use('/edit', isUser(), editController);
router.use('/delete', isUser(), deleteController);
router.use('/users', isGuest(), authController);

module.exports = router;
