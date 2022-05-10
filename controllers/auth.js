const { Router } = require('express');
const router = Router();

const { body, validationResult } = require('express-validator');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    body('username').trim(),
    body('email').trim(),
    body('password').trim(),
    body('rePass').trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Username must be atleast 3 characters long.')
        .bail()
        .isAlphanumeric()
        .withMessage('Username must contains only letters and digits.'),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isAlphanumeric()
        .withMessage('Password must contains only letters and digits'),
    body('rePass')
        .custom((value, { req }) => value == req.body.password)
        .withMessage("Password's not match!"),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { username, email, password, rePass } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await req.auth.register(username, email, password);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            const data = { username, email };
            res.render('register', { errors: error, data });
        }
    }
);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress!'),
    body('password').notEmpty().withMessage('Password is required!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { email, password } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await req.auth.login(email, password);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.render('login', { errors: error });
        }
    }
);

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;
