import React from 'react';
import Saved from './saved.js';
import axios from 'axios';

class Result extends React.Component{
	constructor(){
		super();
	}

	_getHeadlines(){
		let articles = this.props.searched;
		console.log(articles[0].headline.web_url);
		return articles.map( (article)=>{ 
			return( 
				<p><strong> Headline: </strong>{article.headline.main}
					<button className='btn' onClick={ this._saveArticle.bind(article) }>Save Article</button>  
					<br /><strong> Published: </strong>{article.pub_date.slice(0,10)} 
					<br /><a href={article.web_url}>Article Link</a> 
				</p>
			); 
		});
	}//end of _getHeadlines

	_saveArticle(){
		event.preventDefault();

		// post to saved
		axios.post(window.location.origin + '/api/saved',{
			title: this.headline.main,
			date: this.pub_date,
			url: this.web_url
		}).then((response)=>{
			console.log(response.data);
		});
	}


	render(){
		if(this.props.searched){
			return(
				<div>
					<section id='result'>
						<h3>Results</h3>
						{this._getHeadlines()}
					</section>

					<Saved />
				</div>
			);
		}
		else{
			return(
				<div>
					<section id='result'>
						<h3>Results</h3>
					</section>

					<Saved />
				</div>
			);
		}
	} //end of render()

} //end of class

export default Result;