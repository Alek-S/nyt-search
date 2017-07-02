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

	it('responds to GET /assets/images/logo.svg with 200', function(done) {
		request(server)
			.get('/assets/images/logo.svg')
			.expect(200, done);
	});
});



//===API Routes===
describe(chalk.yellow('API Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET api/saved with 200', function(done) {
		request(server)
			.get('/api/saved')
			.expect(200, done);
	});

	it('responds to POST api/saved with 200', function(done) {
		request(server)
			.post('/api/saved')
			.expect(200, done);
	});

	it('responds to DELETE api/saved with 200', function(done) {
		request(server)
			.del('/api/saved')
			.expect(200, done);
	});	

	it('responds to POST api/comment with 200', function(done) {
		request(server)
			.post('/api/comment')
			.expect(200, done);
	});	

	it('responds to DELETE api/comment with 200', function(done) {
		request(server)
			.del('/api/comment')
			.expect(200, done);
	});

});