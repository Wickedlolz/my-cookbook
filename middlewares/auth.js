const { register, login, logout } = require('../services/user');

module.exports = () => {
    return (req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
            res.locals.hasUser = true;
        }

        req.auth = {
            register: (...params) => register(req.session, ...params),
            login: (...params) => login(req.session, ...params),
            logout: () => logout(req.session),
        };

        next();
    };
};
