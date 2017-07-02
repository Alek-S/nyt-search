const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
let ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	comments: [{
		type: String
	}]
});

let Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;