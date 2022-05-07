const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

function isLoggedIn() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };
}

module.exports = {
    hashPassword,
    comparePassword,
    isLoggedIn,
};
