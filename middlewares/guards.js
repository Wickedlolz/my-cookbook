const { getOneById } = require('../services/recipe');

exports.isUser = function () {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };
};

exports.isGuest = function () {
    return (req, res, next) => {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};

exports.isCreator = function () {
    return async (req, res, next) => {
        const recipe = await getOneById(req.params.id);
        if (recipe.author == res.locals.user._id) {
            next();
        } else {
            res.redirect('/');
        }
    };
};
