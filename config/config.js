const env = process.env.PORT;

const config = {
    development: {
        PORT: 3030,
        CONNECTION_STRING: 'mongodb://localhost:27017/my-cookbook',
    },
    production: {
        PORT: process.env.PORT,
        CONNECTION_STRING: process.env.CONNECTION_STRING,
    },
};

module.exports = env ? config.production : config.development;
