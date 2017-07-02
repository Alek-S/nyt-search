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

	//add comment to article
	app.post('/api/comment', (req,res)=>{
		let comment =  req.body.comment;
		let url = req.body.url;

		if(!comment || !url){
			res.json({result: 'missing required body fields'});
		}else{

			Article.update(
				{'url': url},
				{ '$push':	{'comments': comment} }, (err)=>{
					if(err){
						console.log(err);
					}else{
						res.json({result: 'success'});
					}
				}
			);

		}
	});

	//delete comment from article
	app.delete('/api/comment', (req,res)=>{
		let url = req.body.url;
		let position = req.body.position;
		let commentPos = {};

		position = 'comments.' + position;
		commentPos[position] = '1';

		if(!position || !url){
			res.json({result: 'missing required body fields'});
		}else{

			//set the specific comment to be deleted to null in the comments array
			Article.update(
				{'url': url},
				{$unset: commentPos}, (err)=>{
					if(err){
						console.log(err);
					}else{

						//clear out null entries from comments
						Article.update(
							{'url': url}, 
							{$pull : {'comments' : null}}, (err)=>{
								if(err){
									console.log(err);
								}else{
									res.json({result: 'success'});
								}
							}
						);//end of article update

					}
				}
			);//end of article update

		}
	});//end of app.delete

};