/*Sequelize mysql*/
var config = require('../config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	config.mysql.database,
	config.mysql.username,
	config.mysql.password, {
		host: config.mysql.host,
		dialect: 'mysql'
	}
);

module.exports = sequelize;