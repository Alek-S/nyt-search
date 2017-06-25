const request = require('supertest');
const server = require('../server');
const chalk = require('chalk');

//===HTML Routes===
describe( chalk.yellow('HTML Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET / with 200', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	it('responds to GET /assets/css/style.css with 200', function(done) {
		request(server)
			.get('/assets/css/style.css')
			.expect(200, done);
	});

	it('responds to GET /bundle.js with 200', function(done) {
		request(server)
			.get('/bundle.js')
			.expect(200, done);
	});
});



//===API Routes===
// describe(chalk.yellow('API Routes:'), function () {
// 	afterEach(function () {
// 		server.close();
// 	});

// });