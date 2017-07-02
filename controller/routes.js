const request = require('request');

//model
const Article = require('../model/Article.js');


module.exports = function(app) {

	//===API ROUTES===

	//query MongoDB for all saved articles
	app.get('/api/saved', (req,res)=>{

		Article.find({}, (err, docs)=>{
			if(err){
				console.log(err);
			}else{
				res.json(docs);
			}
		});

	});//end of get

	//save an article to MongoDB
	app.post('/api/saved', (req,res)=>{
		let title= req.body.title;
		let date= req.body.date;
		let url= req.body.url;

		if(!title || !date || !url){
			res.json({error: 'missing required body fields'});
		}else{

			//check if already in db
			Article.count({url: url}, (err, count)=>{
				if(err){
					console.log(err);
				}else{
					console.log('count:', count);

					//if yes - return already saved
					if(count > 0){
						res.json({error: 'url already saved'});
					}else{

						//if no - save to document to mongo
						Article.create({
							title: title,
							date: date,
							url: url
						}, (err, entry)=>{
							if(err){
								console.log(err);
							}else{
								res.json(entry);
							}
						});//end of article create
					}
				}
			});//end of article count

		}
	});//end of post

	//delete an article from MongoDB
	app.delete('/api/saved', (req,res)=>{
		let url= req.body.url;

		if(!url){
			res.json({error: 'missing required body fields'});
		}else{

			Article.deleteMany({url:url}, (err)=>{
				if(err){
					console.log(err);
				}else{
					res.json({success: true});
				}
			});
		}
	});//end of delete

};