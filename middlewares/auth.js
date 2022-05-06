const User = require('../models/User');

async function register(username, email, password) {
    const user = new User({
        username,
        email,
        password,
    });

    await user.save();
}

async function login(email, password) {}

module.exports = () => {
    return (req, res, next) => {
        req.auth = {
            register,
            login,
        };

        next();
    };
};
