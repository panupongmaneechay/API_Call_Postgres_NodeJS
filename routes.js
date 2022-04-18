const app_login = require('./app-api/routes/login/routes');

module.exports = (app) => {
	app.use("/app-api/login", app_login);
}
