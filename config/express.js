const express = require('express');
const { engine } = require('express-handlebars');
const expressSession = require('express-session');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.engine('hbs', engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('static'));
    app.use(
        expressSession({
            secret: 'mybiggestsupersecret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: 'auto' },
        })
    );
    app.use(auth());
};
