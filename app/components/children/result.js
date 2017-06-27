import React from 'react';
import Saved from './saved.js';

class Result extends React.Component{
	constructor(){
		super();
	}

	_getHeadlines(){
		let articles = this.props.searched;
		console.log(articles[0].headline.main);
		
		return articles.map( (article)=>{ 
			return( 
				<p>{article.headline.main}</p>
			); 
		});
	}//end of _getHeadlines


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
						<p>No Results</p>
					</section>

					<Saved />
				</div>
			);
		}
	} //end of render()

} //end of class

export default Result;