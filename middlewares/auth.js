const User = require('../models/User');

module.exports = () => {
    const users = [];

    return (req, res, next) => {
        req.auth = {
            login,
            register,
        };

        next();

        async function login(email, password) {
            const user = User.find({ email });

            if (user) {
                req.session.user = user;
                return true;
            } else {
                return false;
            }
        }

        function register(username, password) {
            const user = users.find((u) => u.username == username);

            if (user == undefined) {
                users.push({
                    username,
                    password,
                });

                return true;
            } else {
                return false;
            }
        }
    };
};
