const { Router } = require('express');
const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePass } = req.body;

    if (username == '' || email == '' || password == '' || rePass == '') {
        return res.redirect('/register');
    }

    if (password != rePass) {
        return res.redirect('/register');
    }

    try {
        await req.auth.register(username, email, password);
        res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (await req.auth.login(email, password)) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
