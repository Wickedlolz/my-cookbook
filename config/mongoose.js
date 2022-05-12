const mongoose = require('mongoose');
const config = require('./config');

module.exports = async () => {
    try {
        await mongoose.connect(config.CONNECTION_STRING);
        console.log('DB connected.');

        mongoose.connection.on(
            'error',
            console.error.bind(console, 'connection error:')
        );
    } catch (error) {
        console.error('Database connection error.');
        console.error(error);
    }
};
