const User = require('../models/User');

async function register(session, username, email, password) {
    const user = new User({
        username,
        email,
        password,
    });

    await user.save();

    session.user = {
        id: user._id,
        username: user.username,
    };
}

async function login(session, email, password) {
    const user = await User.findOne({ email });
    console.log(user);

    if (user && (await user.comparePassword(password))) {
        session.user = {
            id: user._id,
            username: user.username,
        };

        return true;
    } else {
        throw new Error('Incorrect username or password');
    }
}

module.exports = () => {
    return (req, res, next) => {
        req.auth = {
            register: (...params) => register(req.session, ...params),
            login: (...params) => login(req.session, ...params),
        };

        next();
    };
};
