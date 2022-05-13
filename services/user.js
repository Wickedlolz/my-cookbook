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

    if (user && (await user.comparePassword(password))) {
        session.user = {
            id: user._id,
            username: user.username,
        };

        return true;
    } else {
        throw [{ msg: 'Incorrect username or password' }];
    }
}

function logout(session) {
    delete session.user;
}

module.exports = {
    register,
    login,
    logout,
};
