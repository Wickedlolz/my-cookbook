const { Router } = require('express');
const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePass } = req.body;

    if (username == '' || email == '' || password == '' || rePass == '') {
        return res.redirect('/users/register');
    }

    if (password != rePass) {
        return res.redirect('/users/register');
    }

    try {
        await req.auth.register(username, email, password);
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.redirect('/users/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

        await req.auth.login(email, password);
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.redirect('/users/login');
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;
