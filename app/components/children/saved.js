import React from 'react';
import axios from 'axios';

class Saved extends React.Component{

	constructor(){
		super();

		this.state={
			savedArticles: []
		};
	}

	//before redner
	componentWillMount(){
		console.log('here');
		this._getarticles();
	}

	componentDidMount(){
		//polling
		this._timer = setInterval( ()=>{
			this._getarticles();
		}, 2000 );
	}

	componentWillUnmount(){
		clearInterval( this._timer);
	}

	_getarticles(){
		axios.get( window.location.origin + '/api/saved').then((response)=>{
			this.setState({
				savedArticles: response.data
			});
		});
	}

	_deleteArticle(){

	}

	_showSaved(){
		console.log('here2');

		return this.state.savedArticles.map( (article)=>{
			console.log(article);
			return(
				<p>{article.title} -- 
					<strong> Published: </strong>{article.date} -- 
					<a href={article.url}>Link</a>
					<button className='btn' onClick={ this._deleteArticle.bind(article) }>Delete Article</button>
				</p> 
			);
		});

	}

	render(){
		return(
			<section id='saved'>
				<h3>Saved</h3>
				{this._showSaved()}
			</section>
		);
	}
} //end of class

export default Saved;