import React from 'react';
import axios from 'axios';

class Saved extends React.Component{

	constructor(){
		super();

		this.state={
			savedArticles: [],
			value: ''
		};
	}

	//before render
	componentWillMount(){
		this._getarticles();
	}

	componentDidMount(){
		//polling
		this._timer = setInterval( ()=>{
			this._getarticles();
		}, 1000 );
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

	_deleteArticle(event){
		event.preventDefault();

		//delete selected article of mongo
		axios({
			method: 'delete',
			url:  window.location.origin + '/api/saved',
			data: {
				url: this.url
			}
		}).then( (response)=>{
			console.log(response.data);
		});
	}

	_handleChange(event){
		event.preventDefault();
		this.value = event.target.value;
	}


	_getComments(article){

		//url of story, and index of comment array - used to bind to _deleteComment
		let toDelete = (url, commentIndex)=>{
			return {url, commentIndex};
		};

		return article.comments.map((comment, index)=>{
			return(
				<p className='comment' value={index}>
					{comment}
					<button className='btn' onClick={ this._deleteComment.bind(toDelete(article.url, index)) }>x</button>
				</p>
			);
		});
	}

	_addComment(event){
		event.preventDefault();

		axios({
			method: 'post',
			url:  window.location.origin + '/api/comment',
			data: {
				url: this.url,
				comment: this.value
			}
		}).then( (response)=>{
			console.log(response.data);
		});
	}

	_deleteComment(event){
		event.preventDefault();

		//article url: this.url
		//comment index: this.commentIndex
		axios({
			method: 'delete',
			url:  window.location.origin + '/api/comment',
			data: {
				url: this.url,
				position: this.commentIndex
			}
		}).then( (response)=>{
			console.log(response.data);
		});

	}
	
	_showSaved(){

		return this.state.savedArticles.map( (article)=>{

			return(
				<div className='resultSection'><strong>Headline: </strong>{article.title}
					<button className='btn' onClick={ this._deleteArticle.bind(article) }>x</button>
					<br /><strong> Published: </strong>{article.date.slice(0,10)}
					<br /><a href={article.url}>Article Link</a>

					<div className='commentsSection'>{this._getComments(article)}</div>

					<form onSubmit={ this._addComment.bind(article) }>
						<input 
							className='commentForm' 
							type="test" placeholder="Add new comment"
							value={article.value} onChange={this._handleChange.bind(article)}
							required
						/><br />
						<button className='addComment' >Add Comment</button>
					</form>

				</div> 
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