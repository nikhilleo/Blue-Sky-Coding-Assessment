// Env Config
require('dotenv').config()
const port = process.env.PORT || 8080;
// Imports
const express = require("express");
const swaggerUi = require('swagger-ui-express');
// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const {handleError,handleNotFoundError} = require('./middlewares/error.middleware');
// Initializing app and requiring database config
const sequelize = require('./database');
const app = express();

// Routes
const co2_emission_routes = require('./routes/co2_emission');
const swaggerSpec = require('./swagger');

// Sync Database
sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use(bodyParser.json());

app.use(cors())

// Handling routes
app.use('/api', co2_emission_routes)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** catch 404 and forward to error handler */
app.use("*", handleNotFoundError);  

app.use(handleError)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})