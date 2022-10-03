const { Sequelize } =  require("sequelize");
const db = require("../config");
require('dotenv').config()

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: db.dialect,
    pool: {
        min: db.pool.min,
        max: db.pool.max,
        acquire: db.pool.acquire,
        idle: db.pool.idle
    }
});

module.exports = sequelize;