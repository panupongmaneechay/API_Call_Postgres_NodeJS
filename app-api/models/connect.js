const { Pool } = require('pg')
const Promise = require('bluebird');
const appConfig = require('../../config/app');


exports.connect = (bu) => {
	return new Promise((resolve, reject) => {
		let connection = new Pool({
			user: appConfig[bu].user,
			password: appConfig[bu].password,
			host: appConfig[bu].server,
			port: appConfig[bu].port,
			database: appConfig[bu].database,
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000
		});
		resolve(connection)
	});
};

exports.closeConn = (conn) => {
	console.log('end')
	conn.end();
};
