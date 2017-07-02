import React from 'react';
import Saved from './saved.js';
import axios from 'axios';

class Result extends React.Component{
	constructor(){
		super();

		this.state={
			timestamp: new Date().getTime()
		};
	}

	_getHeadlines(){
		let articles = this.props.searched;
		// console.log(articles[0].headline.web_url);

		let toBind = (article, callback)=>{
			return {article, callback};
		};

		return articles.map( (article)=>{ 
			return( 
				<p><strong> Headline: </strong>{article.headline.main}
					<button className='btn' onClick={ this._saveArticle.bind( toBind(article, this._resetTimestamp.bind(this)) ) }>Save Article</button>  
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
			title: this.article.headline.main,
			date: this.article.pub_date,
			url: this.article.web_url
		}).then((response)=>{
			console.log(response.data);
			this.callback();
		});
	}

	_resetTimestamp(){
		this.setState({
			timestamp: new Date().getTime()
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

					<Saved value={this.state.timestamp}/>
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