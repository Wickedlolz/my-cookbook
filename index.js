const express = require('express');
const config = require('./config/config');
const routes = require('./routes');

const app = express();
require('./config/express')(app);
app.use(routes);

app.listen(config.PORT, () =>
    console.log(`Server are up and running on PORT: ${config.PORT}`)
);
