const { connect, connection } = require('mongoose');
const config = require('./config');

module.exports = () => {
    connect(config.CONNECTION_STRING, { autoIndex: false });
    const db = connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('DB connected successfully..'));
};
