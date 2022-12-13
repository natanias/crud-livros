const knex = require("knex");
const config = require("../../knexfile");

connection = knex(config.development);

module.exports = connection;
