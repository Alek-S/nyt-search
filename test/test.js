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
});



//===API Routes===
// describe(chalk.yellow('API Routes:'), function () {
// 	afterEach(function () {
// 		server.close();
// 	});

// });